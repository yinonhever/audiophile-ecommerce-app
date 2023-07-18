import dbConnect from "@/lib/dbConnect";
import { getConvertedItem } from "@/lib/functions";
import type { ErrorResponse } from "@/lib/types";
import Collection, { CollectionData } from "@/models/Collection";
import Product, { ProductData } from "@/models/Product";
import type { NextApiRequest, NextApiResponse } from "next";

export const getCollections = async (
  options: Partial<CollectionData> = {},
  fields = ["slug", "title", "image"]
): Promise<CollectionData[]> => {
  await dbConnect();
  const collections = await Collection.find(options).select(fields);
  if (fields.includes("products")) {
    await Promise.all(
      collections.map(doc =>
        doc.populate({
          path: "products",
          model: "Product",
          select: "slug title categoryImage description isNewProduct"
        })
      )
    );
  }
  return collections.map(doc => {
    const collection = getConvertedItem(doc);
    if (collection.products) {
      collection.products = collection.products.map(product =>
        getConvertedItem(product as ProductData)
      );
    }
    return collection;
  });
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<CollectionData[] | ErrorResponse>
) {
  try {
    if (req.method === "GET") {
      const { fields, ...options } = req.query;
      const collections = await getCollections(options, fields as string[]);
      return res.json(collections);
    }
  } catch (error: any) {
    console.log(error);
    res.status(500).json({ msg: error.message });
  }
}
