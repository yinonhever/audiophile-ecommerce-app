import type { ProductData } from "@/models/Product";
import styles from "./ProductSuggestions.module.scss";

export default function ProductSuggestions({
  items
}: {
  items?: ProductData[];
}) {
  return <section className={styles.wrapper}>Suggestions</section>;
}
