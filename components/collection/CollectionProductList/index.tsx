import type { ProductData } from "@/models/Product";
import styles from "./CollectionProductList.module.scss";
import CollectionProductItem from "../CollectionProductItem";

export default function CollectionProductList({
  items
}: {
  items?: ProductData[];
}) {
  return (
    <section className={styles.wrapper}>
      {items?.map((product, index) => (
        <CollectionProductItem
          key={product._id}
          {...product}
          reverse={index % 2 !== 0}
        />
      ))}
    </section>
  );
}
