import type { ProductData } from "@/models/Product";
import styles from "./ProductDescription.module.scss";
import { useState, useContext } from "react";
import { CartContext, CartContextType } from "@/lib/CartContext";
import { convertedNumber } from "@/lib/functions";
import Button from "@/components/UI/Button";
import QtyControls from "@/components/UI/QtyControls";
import ImageWithContent from "@/components/UI/ImageWithContent";

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
    <ImageWithContent
      desktopImg={image?.desktop}
      tabletImg={image?.tablet}
      mobileImg={image?.mobile}
      alt={title}
      twoColumnsTablet
      extraSpaced
      className={styles.wrapper}
    >
      {isNewProduct && <h4 className={styles.label}>New product</h4>}
      <h2 className={styles.title}>{title}</h2>
      <p className={styles.description}>{description}</p>
      <span className={styles.price}>$ {convertedNumber(price)}</span>
      <div className={styles.controls}>
        <QtyControls value={qty} onChange={setQty} minValue={1} wide tile />
        <Button colored onClick={() => addItem(productId, qty)}>
          Add to cart
        </Button>
      </div>
    </ImageWithContent>
  );
}
