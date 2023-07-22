import type { ProductData } from "@/models/Product";
import styles from "./Hero.module.scss";
import Divider from "@/components/UI/Divider";
import Button from "@/components/UI/Button";
import { Fade } from "react-awesome-reveal";

export default function Hero({ product }: { product: ProductData }) {
  return (
    <section className={styles.wrapper}>
      <Divider className={styles.divider} />
      <div className={styles.content}>
        <Fade duration={350} direction="left" cascade triggerOnce>
          <h2 className={styles.label}>
            {product.isNewProduct ? "New product" : "Featured product"}
          </h2>
          <h1 className={styles.title}>{product.title}</h1>
          <p className={styles.text}>{product.heroText}</p>
          <Button colored link={`/products/${product.slug}`}>
            See product
          </Button>
        </Fade>
      </div>
    </section>
  );
}
