import dbConnect from "@/lib/dbConnect";
import Collection, { CollectionData } from "@/models/Collection";
import { NextApiRequest, NextApiResponse } from "next";

export const getCollectionBySlug = async (slug: string) => {
  await dbConnect();
  const doc = await Collection.findOne({ slug }).populate("products");
  if (!doc) return null;
  const collection = doc.toObject() as CollectionData;
  collection._id = collection._id.toString();
  for (const proudct of collection.products) {
    proudct._id = proudct._id.toString();
  }
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
