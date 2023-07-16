import type { CollectionData } from "@/models/Collection";
import styles from "./FeaturedCollection.module.scss";

export default function FeaturedCollection({
  title,
  slug,
  image
}: CollectionData) {
  return <article className={styles.wrapper}></article>;
}
