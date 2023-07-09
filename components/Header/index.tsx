import { CartContext, CartContextType } from "@/lib/CartContext";
import { useContext } from "react";
import styles from "./Header.module.scss";

export default function Header() {
  const { toggleShowCartDrawer } = useContext(CartContext) as CartContextType;

  return <header className={styles.header}></header>;
}
