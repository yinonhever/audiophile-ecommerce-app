import type { ProductData } from "@/models/Product";
import styles from "./ProductDescription.module.scss";
import { useState, useContext } from "react";
import { CartContext, CartContextType } from "@/lib/CartContext";
import { convertedNumber } from "@/lib/functions";
import Button from "@/components/UI/Button";
import QtyControls from "@/components/UI/QtyControls";

export default function ProductDescription({
  title,
  image,
  isNewProduct,
  price,
  description,
  _id: productId
}: ProductData) {
  const { addItem } = useContext(CartContext) as CartContextType;
  const [qty, setQty] = useState(1);

  return (
    <section className={styles.wrapper}>
      <img className={styles.image} src={image?.desktop} alt={title} />
      <div className={styles.content}>
        {isNewProduct && <h3 className={styles.label}>New product</h3>}
        <h2 className={styles.title}>{title}</h2>
        <p className={styles.description}>{description}</p>
        <span className={styles.price}>$ {convertedNumber(price)}</span>
        <div className={styles.controls}>
          <QtyControls
            wide
            className={styles.qty}
            value={qty}
            onChange={setQty}
          />
          <Button colored onClick={() => addItem(productId, qty)}>
            Add to cart
          </Button>
        </div>
      </div>
    </section>
  );
}
