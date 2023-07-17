import type { ProductImage } from "@/lib/types";
import styles from "./ProductGallery.module.scss";

export default function ProductGallery({ items }: { items?: ProductImage[] }) {
  return <section className={styles.wrapper}></section>;
}
