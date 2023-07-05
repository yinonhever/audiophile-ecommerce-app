import Order from "@/models/Order";
import { NextApiRequest, NextApiResponse } from "next";

interface CheckoutRequestData {
  orderId: string;
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method === "POST") {
      const { orderId }: CheckoutRequestData = req.body;
      if (!orderId) {
        return res.status(400).json({ msg: "No order ID was provided" });
      }
      const order = await Order.findById(orderId);
      if (!order) {
        return res.status(404).json({ msg: "Order not found" });
      }
      const { totalPrice } = order;
    }
  } catch (error: any) {
    console.log(error);
    res.status(500).json({ msg: error.message });
  }
};
