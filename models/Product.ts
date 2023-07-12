import { Schema, model, models, Model } from "mongoose";
import type { DataItem } from "@/lib/types";

interface IProduct {
  title: string;
  price: number;
  image: string;
  isNewProduct: boolean;
  description: string;
}

export type ProductData = DataItem<IProduct>;

const productSchema = new Schema<IProduct>(
  {
    title: {
      type: String,
      required: true,
      unique: true
    },
    price: {
      type: Number,
      required: true
    },
    image: {
      type: String,
      required: true
    },
    isNewProduct: {
      type: Boolean,
      default: false
    },
    description: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);

const Product: Model<IProduct> =
  models.Product || model<IProduct>("Product", productSchema);

export default Product;
