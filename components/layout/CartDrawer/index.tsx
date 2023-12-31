import { useContext, useRef, useMemo } from "react";
import { CartContextType, CartContext } from "@/lib/CartContext";
import styles from "./CartDrawer.module.scss";
import { convertedNumber, cx } from "@/lib/functions";
import QtyControls from "@/components/UI/QtyControls";
import Button from "@/components/UI/Button";
import Link from "next/link";
import Image from "next/image";

export default function CartDrawer({ fixed }: { fixed: boolean }) {
  const {
    showCartDrawer: active,
    populatedCartItems,
    updateItemQty,
    clearItems
  } = useContext(CartContext) as CartContextType;
  const element = useRef<HTMLDivElement>(null);

  const hasProductData = useMemo(
    () => populatedCartItems.filter(item => item.product).length > 0,
    [populatedCartItems]
  );

  const totalPrice = useMemo(
    () =>
      +populatedCartItems
        .reduce((sum, item) => sum + (item.product?.price ?? 0) * item.qty, 0)
        .toFixed(2),
    [populatedCartItems]
  );

  const maxHeight = useMemo(
    () => (element.current && active ? `${element.current.scrollHeight}px` : 0),
    [active]
  );

  return (
    <div
      className={cx(styles.wrapper, fixed && styles.fixed)}
      style={{ maxHeight }}
      ref={element}
    >
      <div className={styles.container}>
        {hasProductData ? (
          <>
            <header className={styles.header}>
              <h3 className={styles.title}>
                Cart ({populatedCartItems.length})
              </h3>
              <button className={styles.clear} onClick={clearItems}>
                Remove all
              </button>
            </header>
            <main className={styles.items}>
              {populatedCartItems.map(item => (
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
                  <QtyControls
                    className={styles.item__qty}
                    value={item.qty}
                    onChange={value => updateItemQty(item.productId, value)}
                  />
                </article>
              ))}
            </main>
            <footer className={styles.summary}>
              <span className={styles.summary__label}>Total</span>
              <span className={styles.summary__amount}>
                $ {convertedNumber(totalPrice)}
              </span>
            </footer>
            <Button fullWidth colored link="/checkout">
              Checkout
            </Button>
          </>
        ) : (
          <p className={styles.empty}>Your cart is empty.</p>
        )}
      </div>
    </div>
  );
}
