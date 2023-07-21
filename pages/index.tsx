import Head from "next/head";
import styles from "@/styles/Home.module.scss";
import { GetStaticProps, InferGetStaticPropsType } from "next";
import { getProducts } from "./api/products";
import type { ProductData } from "@/models/Product";
import type { CollectionData } from "@/models/Collection";
import { getCollections } from "./api/collections";
import Page from "@/components/layout/Page";
import Hero from "@/components/home/Hero";
import FeaturedCollections from "@/components/shared/FeaturedCollections";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import About from "@/components/shared/About";
import homepageProducts from "@/lib/assets/homepage-products.json";

export default function Home({
  products,
  collections
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const heroProduct = products.find(
    product => product.slug === homepageProducts.hero
  ) as ProductData;
  const featuredProducts = homepageProducts.featured.map(slug =>
    products.find(product => product.slug === slug)
  ) as ProductData[];

  return (
    <>
      <Head>
        <title>Home – Audiophile</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Page>
        <Hero product={heroProduct} />
        <main className={styles.container}>
          <FeaturedCollections collections={collections} />
          <FeaturedProducts products={featuredProducts} />
          <About />
        </main>
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
