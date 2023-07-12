import styles from "./CartToggle.module.scss";
import { useContext } from "react";
import { CartContext, CartContextType } from "@/lib/CartContext";

export default function CartToggle() {
  const { showCartDrawer: active, toggleShowCartDrawer } = useContext(
    CartContext
  ) as CartContextType;

  return (
    <span className={styles.wrapper} onClick={() => toggleShowCartDrawer()}>
      <svg></svg>
    </span>
  );
}
