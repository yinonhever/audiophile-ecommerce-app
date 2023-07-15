import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next";
import { getProducts } from "../api/products";
import { getProductBySlug } from "../api/products/[slug]";
import { getCollections } from "../api/collections";
import { ProductData } from "@/models/Product";
import { CollectionData } from "@/models/Collection";
import Page from "@/components/layout/Page";

export default function ProductPage({
  product,
  collections
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <Page>
        <div>{product?.title}</div>
      </Page>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  try {
    const products = await getProducts();
    const paths = products.map(product => ({ params: { slug: product.slug } }));
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
    const slug = params?.slug as string;
    const [product, collections] = await Promise.all([
      getProductBySlug(slug),
      getCollections({ showInPages: true })
    ]);
    if (!product) return { notFound: true };
    return { props: { product, collections } };
  } catch (error: any) {
    console.log(error.message);
    return { notFound: true };
  }
};
