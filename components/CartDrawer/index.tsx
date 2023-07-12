import { useContext, useMemo } from "react";
import { CartContextType, CartContext } from "@/lib/CartContext";
import styles from "./CartDrawer.module.scss";
import { cx } from "@/lib/functions";

export default function CartDrawer() {
  const {
    showCartDrawer,
    populatedCartItems,
    addItem,
    updateItemQty,
    clearItems,
    toggleShowCartDrawer
  } = useContext(CartContext) as CartContextType;

  const hasProductData = useMemo(
    () => !!populatedCartItems.find(item => item.product),
    [populatedCartItems]
  );

  return (
    <div className={cx(styles.wrapper, showCartDrawer && styles.active)}>
      <div className={styles.drawer}></div>
      <div
        className={styles.overlay}
        onClick={() => toggleShowCartDrawer(false)}
      />
    </div>
  );
}
