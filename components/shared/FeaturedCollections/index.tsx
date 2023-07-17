import type { CollectionData } from "@/models/Collection";
import styles from "./FeaturedCollections.module.scss";

export default function FeaturedCollections({
  collections
}: {
  collections: CollectionData[];
}) {
  return <section className={styles.wrapper}></section>;
}
