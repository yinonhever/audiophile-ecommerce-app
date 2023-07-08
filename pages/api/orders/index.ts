import Order, { OrderData } from "@/models/Order";
import Product from "@/models/Product";
import type { CartItem } from "@/lib/CartContext";
import type { NextApiRequest, NextApiResponse } from "next";
import type { BillingDetails, OrderPrice, ShippingDetails } from "@/lib/types";
import braintree from "braintree";
import dbConnect from "@/lib/dbConnect";

interface OrderRequestData {
  cartItems: CartItem[];
  billingDetails: BillingDetails;
  shippingDetails: ShippingDetails;
  paymentMethod: string;
  nonce?: string;
}

export const getOrderPrice = async (
  cartItems: CartItem[]
): Promise<OrderPrice> => {
  await dbConnect();
  const products = await Product.find({
    _id: { $in: cartItems.map(item => item.productId) }
  });
  if (products.length !== cartItems.length) {
    throw new Error("One or more cart items have an invalid product ID");
  }
  const populatedItems = cartItems.map(item => ({
    ...item,
    product: products
      .find(product => product._id.toString() === item.productId)
      ?.toObject()
  }));
  const itemsPrice = +populatedItems
    .reduce((sum, item) => sum + (item.product?.price ?? 0) * item.qty, 0)
    .toFixed(2);
  const shippingFee = 50;
  const vat = +((itemsPrice * 20) / 100).toFixed(2);
  const totalPrice = +(itemsPrice + shippingFee + vat).toFixed(2);
  return { itemsPrice, shippingFee, vat, totalPrice };
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method === "POST") {
      const {
        cartItems,
        billingDetails,
        shippingDetails,
        paymentMethod,
        nonce
      }: OrderRequestData = req.body;
      const price = await getOrderPrice(cartItems);
      const products = await Product.find({
        _id: { $in: cartItems.map(item => item.productId) }
      }).select("price");
      const orderItems = cartItems.map(item => ({
        product: item.productId,
        price: products.find(
          product => product._id.toString() === item.productId
        )?.price,
        qty: item.qty
      }));
      const order = new Order({
        items: orderItems,
        price,
        billingDetails,
        shippingDetails,
        paymentMethod
      });
      if (paymentMethod === "credit-card") {
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
          throw new Error(`Payment failed – ${paymentResult.message}`);
        }
      }
      const createdOrder = await order.save();
      await createdOrder.populate({
        path: "items.product",
        model: "Product",
        select: "-price -qty"
      });
      return res.status(201).json(createdOrder);
    }
  } catch (error: any) {
    console.log(error);
    res.status(500).json({ msg: error.message });
  }
};
