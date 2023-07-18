import type { CollectionData } from "@/models/Collection";
import styles from "./FeaturedCollection.module.scss";
import Link from "next/link";
import { cx } from "@/lib/functions";

export default function FeaturedCollection({
  title,
  slug,
  image
}: CollectionData) {
  return (
    <Link className={cx(styles.wrapper)} href={`/collections/${slug}`}>
      <img className={styles.img} src={image} />
      <div className={styles.card}>
        <span className={styles.title}>{title}</span>
        <span className={styles.cta}>
          <small className={styles.label}>Shop</small>
          <svg width="8" height="12" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M1.322 1l5 5-5 5"
              stroke="#D87D4A"
              strokeWidth="2"
              fill="none"
              fillRule="evenodd"
            />
          </svg>
        </span>
      </div>
    </Link>
  );
}
