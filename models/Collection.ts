import { Schema, model, models, Model, Types } from "mongoose";
import type { ProductData } from "./Product";
import type { DataItem } from "@/lib/types";

interface ICollection {
  slug: string;
  title: string;
  image: string;
  products: (Types.ObjectId | ProductData)[];
  showInPages: boolean;
}

export type CollectionData = DataItem<ICollection>;

const collectionSchema = new Schema<ICollection>(
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
    image: {
      type: String,
      required: true,
      unique: true
    },
    products: [
      {
        type: Schema.Types.ObjectId,
        ref: "Product",
        required: true
      }
    ],
    showInPages: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
);

const Collection: Model<ICollection> =
  models.Collection || model<ICollection>("Collection", collectionSchema);

export default Collection;
