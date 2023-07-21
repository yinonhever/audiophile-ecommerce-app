import type { ProductData } from "@/models/Product";
import styles from "./ProductSuggestions.module.scss";
import { Fade } from "react-awesome-reveal";
import ProductSuggestionItem from "../ProductSuggestionItem";

export default function ProductSuggestions({
  suggestions: items
}: ProductData) {
  return (
    <section className={styles.wrapper}>
      <Fade duration={600} direction="left" triggerOnce>
        <h3 className={styles.title}>You may also like</h3>
      </Fade>
      <Fade duration={600} direction="right" triggerOnce>
        <div className={styles.grid}>
          {(items as ProductData[])?.map(product => (
            <ProductSuggestionItem key={product._id} {...product} />
          ))}
        </div>
      </Fade>
    </section>
  );
}
