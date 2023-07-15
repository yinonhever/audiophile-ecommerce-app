import Head from "next/head";
import styles from "@/styles/Home.module.scss";
import { GetStaticProps, InferGetStaticPropsType } from "next";
import { getProducts } from "./api/products";
import type { ProductData } from "@/models/Product";
import type { CollectionData } from "@/models/Collection";
import { getCollections } from "./api/collections";
import Page from "@/components/layout/Page";

export default function Home({
  products,
  collections
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <Head>
        <title>Home – Audiophile</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Page>
        <div>
          {products.map(product => (
            <h3 key={product._id}>{product.title}</h3>
          ))}
        </div>
      </Page>
    </>
  );
}

export const getStaticProps: GetStaticProps<{
  products: ProductData[];
  collections: CollectionData[];
}> = async () => {
  const [products, collections] = await Promise.all([
    getProducts(),
    getCollections({ showInPages: true })
  ]);
  return { props: { products, collections } };
};
