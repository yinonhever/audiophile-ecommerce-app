import dbConnect from "@/lib/dbConnect";
import { getConvertedItem } from "@/lib/functions";
import Product, { ProductData } from "@/models/Product";
import { NextApiRequest, NextApiResponse } from "next";

export const getProducts = async (): Promise<ProductData[]> => {
  await dbConnect();
  const products = await Product.find().select("-suggestions");
  return products.map(doc => getConvertedItem(doc));
};

export default async function (req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method === "GET") {
      const products = await getProducts();
      return res.json(products);
    }
  } catch (error: any) {
    console.log(error.message);
    res.status(500).json({ msg: error.message });
  }
}
