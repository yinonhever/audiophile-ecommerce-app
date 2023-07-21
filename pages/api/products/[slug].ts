import dbConnect from "@/lib/dbConnect";
import { getConvertedItem } from "@/lib/functions";
import type { ErrorResponse } from "@/lib/types";
import Product, { ProductData } from "@/models/Product";
import { NextApiRequest, NextApiResponse } from "next";

export const getProductBySlug = async (
  slug: string
): Promise<ProductData | null> => {
  await dbConnect();
  const doc = await Product.findOne({ slug }).populate({
    path: "suggestions",
    model: "Product",
    select: "slug title image categoryImage"
  });
  if (!doc) return null;
  const product = getConvertedItem(doc);
  product.suggestions = product.suggestions.map(suggestion =>
    getConvertedItem(suggestion as ProductData)
  );
  return product;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ProductData | ErrorResponse>
) {
  const slug = req.query.slug as string;
  const product = await getProductBySlug(slug);
  if (!product) {
    return res.status(404).json({ msg: "Product not found" });
  }
  res.json(product);
}
