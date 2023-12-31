import { CartContext, CartContextType } from "@/lib/CartContext";
import {
  useContext,
  useState,
  useEffect,
  useMemo,
  MouseEventHandler
} from "react";
import styles from "./CheckoutSummary.module.scss";
import { calculateOrderPrice, convertedNumber, cx } from "@/lib/functions";
import Button from "@/components/UI/Button";
import Link from "next/link";
import Spinner from "@/components/UI/Spinner";
import { Fade } from "react-awesome-reveal";
import Image from "next/image";

export default function CheckoutSummary({
  onSubmit
}: {
  onSubmit: MouseEventHandler;
}) {
  const { populatedCartItems } = useContext(CartContext) as CartContextType;
  const [displayedItems, setDisplayedItems] = useState([...populatedCartItems]);
  const orderPrice = useMemo(
    () => calculateOrderPrice(displayedItems),
    [displayedItems]
  );
  const hasProductData = useMemo(
    () => displayedItems.filter(item => item.product).length > 0,
    [displayedItems]
  );

  useEffect(() => {
    if (populatedCartItems.length) {
      setDisplayedItems([...populatedCartItems]);
    }
  }, [populatedCartItems]);

  return (
    <Fade duration={600} direction="right" triggerOnce>
      <section className={styles.wrapper}>
        <h3 className={styles.title}>Summary</h3>
        <div className={styles.content}>
          {hasProductData ? (
            <>
              <div className={cx(styles.section, styles.items)}>
                {displayedItems?.map(item => (
                  <article key={item.productId} className={styles.item}>
                    <Link
                      className={styles.item__img}
                      href={`/products/${item.product?.slug}`}
                    >
                      <Image
                        src={item.product?.image.desktop as string}
                        alt={item.product?.title as string}
                        fill
                      />
                    </Link>
                    <div className={styles.item__content}>
                      <div className={styles.item__main}>
                        <Link
                          className={styles.item__title}
                          href={`/products/${item.product?.slug}`}
                        >
                          {item.product?.shortTitle}
                        </Link>
                        <span className={styles.item__price}>
                          $ {convertedNumber(item.product?.price)}
                        </span>
                      </div>
                      <span className={styles.item__count}>
                        <span className={styles.x}>x</span>
                        {item.qty}
                      </span>
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
                </div>
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
            </>
          ) : (
            <Spinner colored />
          )}
        </div>
      </section>
    </Fade>
  );
}
