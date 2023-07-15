import { Schema, model, models, Model, Types } from "mongoose";
import type { DataItem, ProductImage, ProductInclude } from "@/lib/types";

interface IProduct {
  slug: string;
  title: string;
  shortTitle: string;
  price: number;
  image: ProductImage;
  categoryImage: ProductImage;
  isNewProduct: boolean;
  description: string;
  features: string;
  includedItems: ProductInclude[];
  gallery: ProductImage[];
  suggestions: (Types.ObjectId | Partial<ProductData>)[];
}

export type ProductData = DataItem<IProduct>;

const imageSchema = new Schema<ProductImage>(
  {
    desktop: {
      type: String,
      required: true,
      unique: true
    },
    tablet: {
      type: String,
      required: true,
      unique: true
    },
    mobile: {
      type: String,
      required: true,
      unique: true
    }
  },
  { _id: false }
);

const includeSchema = new Schema<ProductInclude>(
  {
    item: {
      type: String,
      required: true
    },
    quantity: {
      type: Number,
      required: true
    }
  },
  { _id: false }
);

const productSchema = new Schema<IProduct>(
  {
    slug: {
      type: String,
      required: true,
      unique: true
    },
    title: {
      type: String,
      required: true,
      unique: true
    },
    shortTitle: {
      type: String,
      required: true,
      unique: true
    },
    price: {
      type: Number,
      required: true
    },
    image: {
      type: imageSchema,
      required: true
    },
    categoryImage: {
      type: imageSchema,
      required: true
    },
    isNewProduct: {
      type: Boolean,
      default: false
    },
    description: {
      type: String,
      required: true
    },
    features: {
      type: String,
      required: true
    },
    includedItems: [includeSchema],
    gallery: [imageSchema],
    suggestions: [
      {
        type: Schema.Types.ObjectId,
        ref: "Product",
        required: true
      }
    ]
  },
  { timestamps: true }
);

const Product: Model<IProduct> =
  models.Product || model<IProduct>("Product", productSchema);

export default Product;
