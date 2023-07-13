import dbConnect from "@/lib/dbConnect";
import { getConvertedItem } from "@/lib/functions";
import Collection, { CollectionData } from "@/models/Collection";
import type { ProductData } from "@/models/Product";
import type { NextApiRequest, NextApiResponse } from "next";

export const getCollections = async (
  options: Partial<CollectionData> = {}
): Promise<CollectionData[]> => {
  await dbConnect();
  const collections = await Collection.find(options).populate("products");
  return collections.map(doc => {
    const collection = getConvertedItem(doc);
    collection.products = collection.products.map(product =>
      getConvertedItem(product as ProductData)
    );
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
      // if (process.env.NODE_ENV !== "development")
      //   throw new Error("Invalid route");
      await dbConnect();
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
