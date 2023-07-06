import dbConnect from "@/lib/dbConnect";
import Product, { ProductData } from "@/models/Product";
import { NextApiRequest, NextApiResponse } from "next";

export const getProductById = async (productId: string) => {
  await dbConnect();
  const doc = await Product.findById(productId);
  if (!doc) return null;
  const product = doc.toObject() as ProductData;
  product._id = product._id.toString();
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
