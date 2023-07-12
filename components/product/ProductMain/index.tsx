import { ProductData } from "@/models/Product";
import styles from "./ProductMain.module.scss";
import { useState, useContext } from "react";
import { CartContext, CartContextType } from "@/lib/CartContext";
import { convertedNumber, cx } from "@/lib/functions";
import Button from "@/components/UI/Button";

export default function ProductMain({ product }: { product: ProductData }) {
  const { addItem } = useContext(CartContext) as CartContextType;
  const [qty, setQty] = useState(1);

  return (
    <article className={cx(styles.wrapper, "image-with-text")}>
      <img className={styles.image} src={product.image} alt={product.title} />
      <div className={styles.content}>
        {product.isNewProduct && <h3 className={styles.label}>New product</h3>}
        <h2 className={styles.title}>{product.title}</h2>
        <p className={styles.description}>{product.description}</p>
        <span className={styles.price}>$ {convertedNumber(product.price)}</span>
        <div className={styles.controls}>
          <div className={styles.qty}>
            <button
              className={styles.qty__control}
              onClick={() => setQty(qty + 1)}
            >
              +
            </button>
            <span className={styles.qty__count}>{qty}</span>
            <button
              className={styles.qty__control}
              onClick={() => setQty(qty - 1)}
            >
              -
            </button>
          </div>
          <Button colored onClick={() => addItem(product._id, qty)}>
            Add to cart
          </Button>
        </div>
      </div>
    </article>
  );
}
