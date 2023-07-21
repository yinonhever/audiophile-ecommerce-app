import { ProductData } from "@/models/Product";
import styles from "./Hero.module.scss";
import Divider from "@/components/UI/Divider";

export default function Hero({ product }: { product: ProductData }) {
  return (
    <section className={styles.wrapper}>
      <Divider />
      Hero
    </section>
  );
}
