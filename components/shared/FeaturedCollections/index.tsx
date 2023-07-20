import type { CollectionData } from "@/models/Collection";
import styles from "./FeaturedCollections.module.scss";
import FeaturedCollection from "@/components/UI/FeaturedCollection";
import navItems from "@/lib/assets/nav-items.json";
import { Slide } from "react-awesome-reveal";

export default function FeaturedCollections({
  collections,
  tag
}: {
  collections: CollectionData[];
  tag?: "div" | "section";
}) {
  const Tag = tag || "section";
  const items = navItems
    .map(item =>
      collections?.find(
        collection => item.path === `/collections/${collection.slug}`
      )
    )
    .filter(item => item);

  return (
    <Slide direction="left" duration={600} triggerOnce>
      <Tag className={styles.wrapper}>
        {(items as CollectionData[]).map(collection => (
          <FeaturedCollection key={collection._id} {...collection} />
        ))}
      </Tag>
    </Slide>
  );
}
