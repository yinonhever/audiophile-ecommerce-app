import { CollectionData } from "@/models/Collection";
import styles from "./FeaturedCollection.module.scss";

export default function FeaturedCollection({
  collection
}: {
  collection: CollectionData;
}) {
  return <article className={styles.wrapper}></article>;
}
