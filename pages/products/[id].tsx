import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next";
import { getProducts } from "../api/products";
import { getProductById } from "../api/products/[id]";
import { getCollections } from "../api/collections";
import { ProductData } from "@/models/Product";
import { CollectionData } from "@/models/Collection";

export default function ProductPage({
  product,
  collections
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return <div>{product?.title}</div>;
}

export const getStaticPaths: GetStaticPaths = async () => {
  try {
    const products = await getProducts();
    const paths = products.map(product => ({ params: { id: product._id } }));
    return { paths, fallback: true };
  } catch (error: any) {
    console.log(error.message);
    return { paths: [], fallback: true };
  }
};

export const getStaticProps: GetStaticProps<{
  product: ProductData;
  collections: CollectionData[];
}> = async ({ params }) => {
  try {
    const productId = params?.id as string;
    const [product, collections] = await Promise.all([
      getProductById(productId),
      getCollections({ showInPages: true })
    ]);
    if (!product) return { notFound: true };
    return { props: { product, collections } };
  } catch (error: any) {
    console.log(error.message);
    return { notFound: true };
  }
};
