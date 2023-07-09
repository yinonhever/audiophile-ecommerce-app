import dbConnect from "@/lib/dbConnect";
import Collection, { CollectionData } from "@/models/Collection";
import { NextApiRequest, NextApiResponse } from "next";

export const getCollections = async (options: Partial<CollectionData> = {}) => {
  await dbConnect();
  const collections = await Collection.find(options).populate("products");
  return collections.map(doc => {
    const collection = doc.toObject() as CollectionData;
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
      const collections = await getCollections();
      return res.json(collections);
    }

    // TO DELETE BEFORE PUSING TO PRODUCTION
    if (req.method === "POST") {
      if (process.env.NODE_ENV !== "development")
        throw new Error("Invalid route");
      const { data } = req.body;
      const itemsToInsert = Array.isArray(data) ? data : [data];
      const result = await Collection.insertMany(itemsToInsert);
      await Promise.all(
        result.map(collection => collection.populate("products"))
      );
      return res.status(201).json(result);
    }
  } catch (error: any) {
    console.log(error);
    res.status(500).json({ msg: error.message });
  }
};
