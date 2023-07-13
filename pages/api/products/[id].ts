import dbConnect from "@/lib/dbConnect";
import { getConvertedItem } from "@/lib/functions";
import Product, { ProductData } from "@/models/Product";
import { NextApiRequest, NextApiResponse } from "next";

export const getProductById = async (
  productId: string
): Promise<ProductData | null> => {
  await dbConnect();
  const doc = await Product.findById(productId);
  if (!doc) return null;
  const product = getConvertedItem(doc);
  return product;
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const productId = req.query.id as string;
  const product = await getProductById(productId);
  if (!product) {
    return res.status(404).json({ msg: "Product not found" });
  }
  res.json(product);
};
