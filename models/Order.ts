import { Schema, model, models, Model, Types } from "mongoose";
import { DataItem } from "@/lib/types";
import { ProductData } from "./Product";

interface IOrder {
  items: { product: Types.ObjectId | ProductData; qty: number }[];
  itemsPrice: number;
  shippingFee: number;
  totalPrice: number;
}

export type OrderData = DataItem<IOrder>;

const orderSchema = new Schema<IOrder>({
  items: [
    {
      product: {
        type: Schema.Types.ObjectId,
        ref: "Product",
        required: true
      },
      qty: {
        type: Number,
        required: true
      }
    }
  ],
  itemsPrice: {
    type: Number,
    required: true
  },
  shippingFee: {
    type: Number,
    required: true
  },
  totalPrice: {
    type: Number,
    required: true
  }
});

const Order: Model<IOrder> =
  models.Order || model<IOrder>("Order", orderSchema);

export default Order;
