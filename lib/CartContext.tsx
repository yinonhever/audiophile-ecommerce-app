import { ProductData } from "@/models/Product";
import { createContext, useState, useEffect, useMemo, ReactNode } from "react";
import useSWR from "swr";
import { fecther } from "./functions";
import cloneDeep from "clone-deep";
import { getCookie, setCookie } from "cookies-next";
import { useRouter } from "next/router";

interface CartItem {
  productId: string;
  qty: number;
}

export interface CartContextType {
  cartItems: CartItem[];
  populatedCartItems: (CartItem & { product?: ProductData })[];
  addItem: (productId: string, qty: number) => void;
  removeItem: (productId: string) => void;
  updateItemQty: (productId: string, qty: number) => void;
  clearItems: () => void;
  showCartDrawer: boolean;
  toggleShowCartDrawer: (value?: boolean) => void;
}

export const CartContext = createContext<CartContextType | null>(null);

const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    const itemsCookie = getCookie("cartItems") as string;
    return itemsCookie ? JSON.parse(itemsCookie) : [];
  });
  const [showCartDrawer, setShowCartDrawer] = useState(false);
  const { data: products } = useSWR("/api/products", fecther<ProductData[]>);
  const { pathname } = useRouter();

  const populatedCartItems = useMemo(
    () =>
      cartItems.map(cartItem => ({
        ...cartItem,
        product: products?.find(product => product._id === cartItem.productId)
      })),
    [cartItems, products]
  );

  useEffect(() => {
    setCookie("cartItems", cartItems);
  }, [cartItems]);

  useEffect(() => {
    setShowCartDrawer(false);
  }, [pathname]);

  const addItem = (productId: string, qty: number) => {
    const clonedItems = cloneDeep(cartItems);
    const existingItem = clonedItems.find(item => item.productId === productId);
    if (existingItem) {
      existingItem.qty += qty;
      setCartItems(clonedItems);
    } else {
      const newItem = { productId, qty };
      setCartItems([...clonedItems, newItem]);
    }
    setShowCartDrawer(true);
  };

  const removeItem = (productId: string) =>
    setCartItems(cartItems.filter(item => item.productId !== productId));

  const updateItemQty = (productId: string, qty: number) => {
    if (qty === 0) return removeItem(productId);
    const clonedItems = cloneDeep(cartItems);
    const item = clonedItems.find(item => item.productId === productId);
    if (!item) return;
    item.qty = qty;
    setCartItems(clonedItems);
  };

  const clearItems = () => setCartItems([]);

  const toggleShowCartDrawer = (value?: boolean) =>
    setShowCartDrawer(value ?? !showCartDrawer);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        populatedCartItems,
        addItem,
        removeItem,
        updateItemQty,
        clearItems,
        showCartDrawer,
        toggleShowCartDrawer
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
