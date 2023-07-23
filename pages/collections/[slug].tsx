import type { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { getCollections } from "@/pages/api/collections";
import { getCollectionBySlug } from "@/pages/api/collections/[slug]";
import type { CollectionData } from "@/models/Collection";
import type { ProductData } from "@/models/Product";
import Head from "next/head";
import Page from "@/components/layout/Page";
import CollectionHeading from "@/components/collection/CollectionHeading";
import CollectionProductList from "@/components/collection/CollectionProductList";
import FeaturedCollections from "@/components/shared/FeaturedCollections";
import About from "@/components/shared/About";
import styles from "@/styles/CollectionPage.module.scss";

export default function CollectionPage({
  collection,
  collectionList
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
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

export const getServerSideProps: GetServerSideProps<{
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
