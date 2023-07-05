import Order, { OrderData } from "@/models/Order";
import Product from "@/models/Product";
import type { CartItem } from "@/lib/CartContext";
import type { NextApiRequest, NextApiResponse } from "next";
import type { BillingDetails, ShippingDetails } from "@/lib/types";

interface OrderRequestData {
  items: CartItem[];
  billingDetails: BillingDetails;
  shippingDetails: ShippingDetails;
  paymentMethod: string;
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
  const totalPrice = itemsPrice + shippingFee;
  return { itemsPrice, shippingFee, totalPrice };
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method === "POST") {
      const {
        items,
        shippingDetails,
        billingDetails,
        paymentMethod
      }: OrderRequestData = req.body;
      const orderPrice = await getOrderPrice(items);
      const { itemsPrice, shippingFee, totalPrice } = orderPrice;
      const doc = await new Order({
        items,
        shippingDetails,
        billingDetails,
        paymentMethod,
        itemsPrice,
        shippingFee,
        totalPrice
      }).save();
      const order: OrderData = doc.toObject();
      order._id = order._id.toString();
      return res.status(201).json(order);
    }
  } catch (error: any) {
    console.log(error)
    res.status(500).json({ msg: error.message });
  }
};
