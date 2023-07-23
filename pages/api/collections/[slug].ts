import dbConnect from "@/lib/dbConnect";
import { getConvertedItem } from "@/lib/functions";
import type { ErrorResponse } from "@/lib/types";
import Collection, { CollectionData } from "@/models/Collection";
import Product, { ProductData } from "@/models/Product";
import type { NextApiRequest, NextApiResponse } from "next";

export const getCollectionBySlug = async (
  slug: string
): Promise<CollectionData | null> => {
  await dbConnect();
  new Product();
  const doc = await Collection.findOne({ slug }).populate({
    path: "products",
    model: "Product",
    select: "slug title categoryImage description isNewProduct"
  });
  if (!doc) return null;
  const collection = getConvertedItem(doc);
  collection.products = collection.products
    .map(product => getConvertedItem(product as ProductData))
    .sort((a, b) => +b.isNewProduct - +a.isNewProduct);
  return collection;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<CollectionData | ErrorResponse>
) {
  try {
    const slug = req.query.slug as string;
    const collection = await getCollectionBySlug(slug);
    if (!collection) {
      return res.status(404).json({ msg: "Collection not found" });
    }
    res.json(collection);
  } catch (error: any) {
    console.log(error);
    res.status(500).json({ msg: error.message });
  }
}
