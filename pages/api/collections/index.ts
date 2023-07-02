import dbConnect from "@/lib/dbConnect";
import Collection, { CollectionData } from "@/models/Collection";
import { NextApiRequest, NextApiResponse } from "next";

export const getCollections = async (options = {}) => {
  await dbConnect();
  const collections = await Collection.find(options).populate("products");
  return collections.map(doc => {
    const collection: CollectionData = doc.toObject();
    collection._id = collection._id.toString();
    for (const proudct of collection.products) {
      proudct._id = proudct._id.toString();
    }
    return collection;
  });
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const collections = await getCollections(req.query);
    res.json(collections);
  } catch (error: any) {
    console.log(error);
    res.status(500).json({ msg: error.message });
  }
};
