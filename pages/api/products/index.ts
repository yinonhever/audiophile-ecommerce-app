import dbConnect from "@/lib/dbConnect";
import Product, { ProductData } from "@/models/Product";
import { NextApiRequest, NextApiResponse } from "next";

export const getProducts = async () => {
  await dbConnect();
  const products = await Product.find();
  return products.map(doc => {
    const product = doc.toObject() as ProductData;
    product._id = product._id.toString();
    return product;
  });
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method === "GET") {
      const products = await getProducts();
      return res.json(products);
    }

    // TO DELETE BEFORE PUSING TO PRODUCTION
    if (req.method === "POST") {
      if (process.env.NODE_ENV !== "development")
        throw new Error("Invalid route");
      const { data } = req.body;
      const itemsToInsert = Array.isArray(data) ? data : [data];
      const result = await Product.insertMany(itemsToInsert);
      const products = result.map(doc => {
        const product: ProductData = doc.toObject();
        product._id = product._id.toString();
        return product;
      });
      return res.status(201).json(products);
    }
  } catch (error: any) {
    console.log(error);
    res.status(500).json({ msg: error.message });
  }
};
