import type { ProductData } from "@/models/Product";
import styles from "./ProductFeatures.module.scss";

export default function ProductFeatures({
  features,
  includedItems
}: ProductData) {
  return <section className={styles.wrapper}></section>;
}
