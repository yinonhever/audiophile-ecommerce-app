import { Schema, model, models, Model } from "mongoose";
import type { DataItem } from "@/lib/types";

interface IProduct {
  title: string;
  price: number;
  qty?: number;
}

export type ProductData = DataItem<IProduct>;

const productSchema = new Schema<IProduct>({
  title: {
    type: String,
    required: true,
    unique: true
  },
  price: {
    type: Number,
    required: true
  },
  qty: Number
});

const Product: Model<IProduct> =
  models.Product || model<IProduct>("Product", productSchema);

export default Product;
