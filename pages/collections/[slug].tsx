import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next";
import { getCollections } from "../api/collections";
import { getCollectionBySlug } from "../api/collections/[slug]";
import { CollectionData } from "@/models/Collection";
import { ProductData } from "@/models/Product";

export default function CollectionPage({
  collection
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <div>{collection?.title}</div>
      {collection?.products.map(item => {
        const product = { ...item } as ProductData;
        return <h3 key={product._id}>{product.title}</h3>;
      })}
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
}> = async ({ params }) => {
  try {
    const slug = params?.slug as string;
    const collection = await getCollectionBySlug(slug);
    if (!collection) return { notFound: true };
    return { props: { collection } };
  } catch (error: any) {
    console.log(error.message);
    return { notFound: true };
  }
};
