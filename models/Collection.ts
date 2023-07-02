import { Schema, model, models, Model, Types } from "mongoose";
import { ProductData } from "./Product";
import { DataItem } from "@/lib/types";

interface ICollection {
  title: string;
  slug: string;
  products: (Types.ObjectId | ProductData)[];
  showInHomepage: boolean;
}

export type CollectionData = DataItem<ICollection>;

const collectionSchema = new Schema<ICollection>({
  title: {
    type: String,
    required: true,
    unique: true
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    immutable: true
  },
  products: [
    {
      type: Schema.Types.ObjectId,
      ref: "Product"
    }
  ],
  showInHomepage: {
    type: Boolean,
    default: false
  }
});

const Collection: Model<ICollection> =
  models.Collection || model<ICollection>("Collection", collectionSchema);

export default Collection;
