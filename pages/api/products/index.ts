import dbConnect from "@/lib/dbConnect";
import Product, { ProductData } from "@/models/Product";
import { NextApiRequest, NextApiResponse } from "next";

export const getProducts = async () => {
  await dbConnect();
  const products = await Product.find();
  return products.map(doc => {
    const product: ProductData = doc.toObject();
    product._id = product._id.toString();
    return product;
  });
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const products = await getProducts();
    res.json(products);
  } catch (error: any) {
    console.log(error);
    res.status(500).json({ msg: error.message });
  }
};
