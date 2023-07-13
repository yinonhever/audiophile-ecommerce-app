import type { OrderPrice, PropsWithClassName } from "@/lib/types";
import { CartContext, CartContextType } from "@/lib/CartContext";
import { useContext, useState, useEffect, MouseEventHandler } from "react";
import styles from "./OrderSummary.module.scss";
import { convertedNumber, cx } from "@/lib/functions";
import Button from "../../UI/Button";

export default function OrderSummary({
  orderPrice,
  onSubmit,
  className
}: PropsWithClassName<{
  orderPrice: OrderPrice;
  onSubmit: MouseEventHandler<HTMLButtonElement>;
}>) {
  const { populatedCartItems } = useContext(CartContext) as CartContextType;
  const [displayedItems, setDisplayedItems] =
    useState<typeof populatedCartItems>();

  useEffect(() => {
    if (populatedCartItems.length) {
      setDisplayedItems([...populatedCartItems]);
    }
  }, [populatedCartItems]);

  return (
    <div className={cx(styles.summary, className)}>
      <h3 className={styles.title}>Summary</h3>
      <div className={cx(styles.section, styles.items)}>
        {displayedItems?.map(item => (
          <article key={item.productId} className={styles.item}>
            <div className={styles.item__img}>
              <img src={item.product?.image} alt={item.product?.title} />
            </div>
            <div className={styles.item__content}>
              <span className={styles.item__title}>{item.product?.title}</span>
              <span className={styles.item__price}>{item.product?.price}</span>
              <span className={styles.item__count}>X{item.qty}</span>
            </div>
          </article>
        ))}
      </div>
      <div className={cx(styles.section, styles.pricing)}>
        <div className={styles.priceRow}>
          <span className={styles.priceRow__label}>Total</span>
          <span className={styles.priceRow__amount}>
            $ {convertedNumber(orderPrice.itemsPrice)}
          </span>
        </div>{" "}
        <div className={styles.priceRow}>
          <span className={styles.priceRow__label}>Shipping</span>
          <span className={styles.priceRow__amount}>
            $ {convertedNumber(orderPrice.shippingFee)}
          </span>
        </div>
        <div className={styles.priceRow}>
          <span className={styles.priceRow__label}>VAT (included)</span>
          <span className={styles.priceRow__amount}>
            $ {convertedNumber(orderPrice.vat)}
          </span>
        </div>
      </div>
      <div className={cx(styles.section, styles.pricing)}>
        <div className={cx(styles.priceRow, styles.totalRow)}>
          <span className={styles.priceRow__label}>Grand total</span>
          <span className={styles.priceRow__amount}>
            $ {convertedNumber(orderPrice.totalPrice)}
          </span>
        </div>
      </div>
      <Button fullWidth colored onClick={onSubmit}>
        Continue & pay
      </Button>
    </div>
  );
}
