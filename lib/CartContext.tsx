import {
  createContext,
  useState,
  useEffect,
  useMemo,
  PropsWithChildren
} from "react";
import { useRouter } from "next/router";
import useSWR from "swr";
import cloneDeep from "clone-deep";
import { fecther } from "./functions";
import useSavedState from "./useSavedState";
import type { ProductData } from "@/models/Product";

export interface CartItem {
  productId: string;
  qty: number;
}

export interface PopulatedCartItem extends CartItem {
  product?: ProductData;
}

export interface CartContextType {
  cartItems: CartItem[];
  populatedCartItems: PopulatedCartItem[];
  addItem: (productId: string, qty: number) => void;
  removeItem: (productId: string) => void;
  updateItemQty: (productId: string, qty: number) => void;
  clearItems: () => void;
  showCartDrawer: boolean;
  toggleShowCartDrawer: (value?: boolean) => void;
}

export const CartContext = createContext<CartContextType | null>(null);

export default function CartProvider({ children }: PropsWithChildren) {
  const [cartItems, setCartItems] = useSavedState<CartItem[]>("cartItems", []);
  const [showCartDrawer, setShowCartDrawer] = useState(false);
  const { data: products } = useSWR("/api/products", fecther<ProductData[]>);
  const { asPath } = useRouter();

  const populatedCartItems = useMemo(
    () =>
      cartItems.map(cartItem => ({
        ...cartItem,
        product: products?.find(product => product._id === cartItem.productId)
      })),
    [cartItems, products]
  );

  useEffect(() => {
    setShowCartDrawer(false);
  }, [asPath]);

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
    setTimeout(() => setShowCartDrawer(true));
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
}
