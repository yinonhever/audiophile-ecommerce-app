import type {
  GetStaticPaths,
  GetStaticProps,
  InferGetStaticPropsType
} from "next";
import { getProducts } from "../api/products";
import { getProductBySlug } from "../api/products/[slug]";
import { getCollections } from "../api/collections";
import type { ProductData } from "@/models/Product";
import type { CollectionData } from "@/models/Collection";
import Page from "@/components/layout/Page";
import ProductDescription from "@/components/product/ProductDescription";
import Head from "next/head";
import ProductFeatures from "@/components/product/ProductFeatures";
import ProductGallery from "@/components/product/ProductGallery";
import ProductSuggestions from "@/components/product/ProductSuggestions";
import styles from "@/styles/ProductPage.module.scss";
import GoBackButton from "@/components/UI/GoBackButton";
import About from "@/components/shared/About";
import FeaturedCollections from "@/components/shared/FeaturedCollections";

export default function ProductPage({
  product,
  collections
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <Head>
        <title>{product.title} – Audiophile</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Page>
        <main className={styles.container}>
          <GoBackButton className={styles.goBack} />
          <ProductDescription {...product} />
          <ProductFeatures {...product} />
          <ProductGallery items={product.gallery} />
          <ProductSuggestions items={product.suggestions as ProductData[]} />
          <FeaturedCollections collections={collections} />
          <About />
        </main>
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
