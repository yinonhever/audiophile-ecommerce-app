import dbConnect from "@/lib/dbConnect";
import { getConvertedItem } from "@/lib/functions";
import Collection, { CollectionData } from "@/models/Collection";
import type { ProductData } from "@/models/Product";
import type { NextApiRequest, NextApiResponse } from "next";

export const getCollectionBySlug = async (
  slug: string
): Promise<CollectionData | null> => {
  await dbConnect();
  const doc = await Collection.findOne({ slug }).populate({
    path: "products",
    model: "Product",
    select: "slug title categoryImage description isNewProduct"
  });
  if (!doc) return null;
  const collection = getConvertedItem(doc);
  collection.products = collection.products.map(product =>
    getConvertedItem(product as ProductData)
  );
  return collection;
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const slug = req.query.slug as string;
    const collection = await getCollectionBySlug(slug);
    res.json(collection);
  } catch (error: any) {
    console.log(error);
    res.status(500).json({ msg: error.message });
  }
};
