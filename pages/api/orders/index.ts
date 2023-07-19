import Order, { OrderData } from "@/models/Order";
import Product from "@/models/Product";
import type { CartItem, PopulatedCartItem } from "@/lib/CartContext";
import type { NextApiRequest, NextApiResponse } from "next";
import type { CheckoutData, ErrorResponse } from "@/lib/types";
import braintree from "braintree";
import { calculateOrderPrice } from "@/lib/functions";
import dbConnect from "@/lib/dbConnect";
import { PAYMENT_METHODS } from "@/lib/constants";

interface OrderRequestData extends CheckoutData {
  cartItems: CartItem[];
  nonce?: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<OrderData | ErrorResponse>
) {
  try {
    if (req.method === "POST") {
      await dbConnect();
      const {
        cartItems,
        billingDetails,
        shippingDetails,
        paymentMethod,
        nonce
      }: OrderRequestData = req.body;
      const products = await Product.find({
        _id: { $in: cartItems.map(item => item.productId) }
      }).select("price");
      const populatedItems: PopulatedCartItem[] = cartItems.map(item => ({
        ...item,
        product: products
          .find(product => product._id.toString() === item.productId)
          ?.toObject()
      }));
      const orderItems = populatedItems.map(item => ({
        product: item.productId,
        price: item.product?.price,
        qty: item.qty
      }));
      const price = calculateOrderPrice(populatedItems);
      const order = new Order({
        items: orderItems,
        price,
        billingDetails,
        shippingDetails,
        paymentMethod
      });
      if (paymentMethod === PAYMENT_METHODS.CREDIT_CARD) {
        const gateway = new braintree.BraintreeGateway({
          environment: braintree.Environment.Sandbox,
          merchantId: process.env.BRAINTREE_MERCHANT_ID as string,
          publicKey: process.env.BRAINTREE_PUBLIC_KEY as string,
          privateKey: process.env.BRAINTREE_PRIVATE_KEY as string
        });
        const paymentResult = await gateway.transaction.sale({
          amount: price.totalPrice.toFixed(2),
          paymentMethodNonce: nonce,
          options: { submitForSettlement: true }
        });
        if (paymentResult.success) {
          order.isPaid = true;
          order.paymentResult = paymentResult;
        } else {
          return res
            .status(420)
            .json({ msg: `Payment failed – ${paymentResult.message}` });
        }
      }
      const createdOrder = await order.save();
      await createdOrder.populate({
        path: "items.product",
        model: "Product",
        select: "slug title image"
      });
      return res.status(201).json(createdOrder.toObject());
    }
  } catch (error: any) {
    console.log(error);
    res.status(500).json({ msg: error.message });
  }
}
