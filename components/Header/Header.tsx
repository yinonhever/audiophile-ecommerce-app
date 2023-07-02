import { CartContext, CartContextType } from "@/lib/CartContext";
import { useContext } from "react";

export default function Header() {
  const { toggleShowCartDrawer } = useContext(CartContext) as CartContextType;

  return <div></div>;
}
