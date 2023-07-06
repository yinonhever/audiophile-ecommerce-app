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
    if (req.method === "GET") {
      const collections = await getCollections(req.query);
      return res.json(collections);
    }

    // TO DELETE BEFORE PUSING TO PRODUCTION
    if (req.method === "POST") {
      if (process.env.NODE_ENV !== "development")
        throw new Error("Invalid route");
      const { data } = req.body;
      const itemsToInsert = Array.isArray(data) ? data : [data];
      const result = await Collection.insertMany(itemsToInsert);
      await Promise.all(result.map(item => item.populate("products")));
      const collections = result.map(doc => {
        const collection: CollectionData = doc.toObject();
        collection._id = collection._id.toString();
        for (const proudct of collection.products) {
          proudct._id = proudct._id.toString();
        }
        return collection;
      });
      return res.status(201).json(collections);
    }
  } catch (error: any) {
    console.log(error);
    res.status(500).json({ msg: error.message });
  }
};
