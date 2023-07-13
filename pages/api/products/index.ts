import dbConnect from "@/lib/dbConnect";
import { getConvertedItem } from "@/lib/functions";
import Product, { ProductData } from "@/models/Product";
import { NextApiRequest, NextApiResponse } from "next";

export const getProducts = async (): Promise<ProductData[]> => {
  await dbConnect();
  const products = await Product.find();
  return products.map(doc => getConvertedItem(doc));
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method === "GET") {
      const products = await getProducts();
      return res.json(products);
    }

    // TO DELETE BEFORE PUSING TO PRODUCTION
    if (req.method === "POST") {
      // if (process.env.NODE_ENV !== "development")
      //   throw new Error("Invalid route");
      await dbConnect();
      const { data } = req.body;
      const itemsToInsert = Array.isArray(data) ? data : [data];
      const result = await Product.insertMany(itemsToInsert);
      return res.status(201).json(result);
    }
  } catch (error: any) {
    console.log(error);
    res.status(500).json({ msg: error.message });
  }
};
