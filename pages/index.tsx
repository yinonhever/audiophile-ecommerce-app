import Head from "next/head";
import styles from "@/styles/Home.module.scss";
import { GetStaticProps, InferGetStaticPropsType } from "next";
import { getProducts } from "./api/products";
import type { ProductData } from "@/models/Product";
import type { CollectionData } from "@/models/Collection";
import { getCollections } from "./api/collections";
import axios from "axios";
import tempData from "@/temp.json";
import tempData2 from "@/temp3.json";
import Page from "@/components/layout/Page";

const temp = async () => {
  try {
    const { data } = await axios.post("/api/collections", tempData);
    console.log(data);
  } catch (error: any) {
    console.log(error.response?.data);
  }
};

const temp2 = async () => {
  try {
    console.log(tempData2);
    const { data } = await axios.post("/api/products", { data: tempData2 });
    console.log(data);
  } catch (error: any) {
    console.log(error.response?.data);
  }
};

const temp3 = async () => {
  try {
    console.log(tempData2);
    const { data } = await axios.put("/api/products", { data: tempData2 });
    console.log(data);
  } catch (error: any) {
    console.log(error.response?.data);
  }
};

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
        <div>
          <button onClick={temp}>Create collection temp</button>
        </div>
        <div>
          <button onClick={temp2}>Create product temp</button>
        </div>
        <div>
          <button onClick={temp3}>Update product temp</button>
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
