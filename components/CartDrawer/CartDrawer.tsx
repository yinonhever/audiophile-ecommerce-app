import { useContext, useEffect } from "react";
import { CartContextType, CartContext } from "@/lib/CartContext";
import styles from "./CartDrawer.module.scss";

export default function CartDrawer() {
  const { showCartDrawer, populatedCartItems } = useContext(
    CartContext
  ) as CartContextType;

  useEffect(() => {
    // 
  }, [populatedCartItems]);

  return <div className={styles["cart-drawer"]}></div>;
}
