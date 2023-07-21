import styles from "./ProductGallery.module.scss";
import type { ProductData } from "@/models/Product";
import { Zoom } from "react-awesome-reveal";

export default function ProductGallery({
  gallery: items,
  title: alt
}: ProductData) {
  return (
    <section className={styles.wrapper}>
      <Zoom duration={350} cascade triggerOnce className={styles.item}>
        {items?.map(item => (
          <picture key={item.desktop}>
            <source media="(max-width: 600px)" srcSet={item.mobile} />
            <source media="(max-width: 1000px)" srcSet={item.tablet} />
            <img src={item.desktop} alt={alt} />
          </picture>
        ))}
      </Zoom>
    </section>
  );
}
