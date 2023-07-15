import dbConnect from "@/lib/dbConnect";
import { getConvertedItem } from "@/lib/functions";
import Collection, { CollectionData } from "@/models/Collection";
import type { ProductData } from "@/models/Product";
import type { NextApiRequest, NextApiResponse } from "next";

export const getCollections = async (
  options: Partial<CollectionData> = {}
): Promise<CollectionData[]> => {
  await dbConnect();
  const collections = await Collection.find(options).populate({
    path: "products",
    model: "Product",
    select: "slug title categoryImage description isNewProduct"
  });
  return collections.map(doc => {
    const collection = getConvertedItem(doc);
    collection.products = collection.products.map(product =>
      getConvertedItem(product as ProductData)
    );
    return collection;
  });
};

export default async function (req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method === "GET") {
      const collections = await getCollections();
      return res.json(collections);
    }
  } catch (error: any) {
    console.log(error);
    res.status(500).json({ msg: error.message });
  }
}
