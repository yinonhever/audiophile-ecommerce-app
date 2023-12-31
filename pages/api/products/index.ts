import dbConnect from "@/lib/dbConnect";
import { getConvertedItem } from "@/lib/functions";
import type { ErrorResponse } from "@/lib/types";
import Product, { ProductData } from "@/models/Product";
import type { NextApiRequest, NextApiResponse } from "next";

export const getProducts = async (): Promise<ProductData[]> => {
  await dbConnect();
  const products = await Product.find().select("-suggestions");
  return products.map(getConvertedItem);
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ProductData[] | ErrorResponse>
) {
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
