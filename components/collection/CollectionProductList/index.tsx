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
      {items?.map(product => (
        <CollectionProductItem key={product._id} {...product} />
      ))}
    </section>
  );
}
