import type { ProductData } from "@/models/Product";
import styles from "./CollectionProductItem.module.scss";

export default function CollectionProductItem({
  slug,
  title,
  categoryImage,
  isNewProduct,
  description
}: ProductData) {
  return <article className={styles.wrapper}></article>;
}
