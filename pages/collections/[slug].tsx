import type {
  GetStaticPaths,
  GetStaticProps,
  InferGetStaticPropsType
} from "next";
import { getCollections } from "../api/collections";
import { getCollectionBySlug } from "../api/collections/[slug]";
import type { CollectionData } from "@/models/Collection";
import type { ProductData } from "@/models/Product";
import Page from "@/components/layout/Page";
import Head from "next/head";
import CollectionHeading from "@/components/collection/CollectionHeading";
import CollectionItem from "@/components/collection/CollectionProductItem";
import styles from "@/styles/CollectionPage.module.scss";
import FeaturedCollections from "@/components/shared/FeaturedCollections";
import About from "@/components/shared/About";
import CollectionProductList from "@/components/collection/CollectionProductList";

export default function CollectionPage({
  collection,
  collectionList
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <Head>
        <title>{`${collection?.title} – Audiophile`}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Page>
        <CollectionHeading title={collection?.title} />
        <main className={styles.container}>
          <CollectionProductList
            items={collection?.products as ProductData[]}
          />
          <FeaturedCollections collections={collectionList} />
          <About />
        </main>
      </Page>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  try {
    const collections = await getCollections();
    const paths = collections.map(collection => ({
      params: { slug: collection.slug }
    }));
    return { paths, fallback: true };
  } catch (error: any) {
    console.log(error.message);
    return { paths: [], fallback: true };
  }
};

export const getStaticProps: GetStaticProps<{
  collection: CollectionData;
  collectionList: CollectionData[];
}> = async ({ params }) => {
  try {
    const slug = params?.slug as string;
    const [collection, collectionList] = await Promise.all([
      getCollectionBySlug(slug),
      getCollections({ showInPages: true })
    ]);
    if (!collection) return { notFound: true };
    return { props: { collection, collectionList } };
  } catch (error: any) {
    console.log(error.message);
    return { notFound: true };
  }
};
