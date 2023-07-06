import Order, { OrderData } from "@/models/Order";
import Product from "@/models/Product";
import type { CartItem } from "@/lib/CartContext";
import type { NextApiRequest, NextApiResponse } from "next";
import type { BillingDetails, ShippingDetails } from "@/lib/types";
import braintree from "braintree";

interface OrderRequestData {
  items: CartItem[];
  billingDetails: BillingDetails;
  shippingDetails: ShippingDetails;
  paymentMethod: string;
  paymentMethodNonce?: string;
}

export const getOrderPrice = async (cartItems: CartItem[]) => {
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
  const itemsPrice = populatedItems.reduce(
    (sum, item) => sum + (item.product?.price ?? 0) * item.qty,
    0
  );
  const shippingFee = 50;
  const vat = (itemsPrice * 20) / 100;
  const totalPrice = itemsPrice + shippingFee + vat;
  return { itemsPrice, shippingFee, vat, totalPrice };
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method === "POST") {
      const {
        items,
        billingDetails,
        shippingDetails,
        paymentMethod,
        paymentMethodNonce
      }: OrderRequestData = req.body;
      const price = await getOrderPrice(items);
      const order = new Order({
        items,
        price,
        billingDetails,
        shippingDetails,
        paymentMethod
      });
      if (paymentMethod === "e-money") {
        const gateway = new braintree.BraintreeGateway({
          environment: braintree.Environment.Sandbox,
          merchantId: process.env.BRAINTREE_MERCHANT_ID as string,
          publicKey: process.env.BRAINTREE_PUBLIC_KEY as string,
          privateKey: process.env.BRAINTREE_PRIVATE_KEY as string
        });
        const paymentResult = await gateway.transaction.sale({
          amount: price.totalPrice.toFixed(2),
          paymentMethodNonce,
          options: { submitForSettlement: true }
        });
        console.log("payment result", paymentResult);
        if (paymentResult.success) {
          order.isPaid = true;
          order.paymentResult = paymentResult;
        } else {
          throw new Error(`Payment failed | ${paymentResult.message}`);
        }
      }
      const doc = await order.save();
      const orderData: OrderData = doc.toObject();
      orderData._id = orderData._id.toString();
      return res.status(201).json(orderData);
    }
  } catch (error: any) {
    console.log(error);
    res.status(500).json({ msg: error.message });
  }
};
