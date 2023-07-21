import { ProductData } from "@/models/Product";
import styles from "./FeaturedProducts.module.scss";

export default function FeaturedProducts({
  products
}: {
  products: ProductData[];
}) {
  return <section className={styles.wrapper}>Featured products</section>;
}
