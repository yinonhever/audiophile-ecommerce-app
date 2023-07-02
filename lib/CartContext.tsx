import { ProductData } from "@/models/Product";
import { createContext, useState, useEffect, useMemo, ReactNode } from "react";
import useSWR from "swr";
import { fecther } from "./functions";
import cloneDeep from "clone-deep";
import { getCookie, setCookie } from "cookies-next";

type CartItem = {
  productId: string;
  qty: number;
};

export type CartContextType = {
  cartItems: CartItem[];
  addItem: (productId: string, qty: number) => void;
  removeItem: (productId: string) => void;
  updateItemQty: (productId: string, qty: number) => void;
  clearItems: () => void;
  populatedCartItems: (CartItem & { product?: ProductData })[];
  showCartDrawer: boolean;
  toggleShowCartDrawer: (value?: boolean) => void;
  productData: ProductData[] | undefined;
};

export const CartContext = createContext<CartContextType | null>(null);

const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    const itemsCookie = getCookie("cartItems") as string;
    return itemsCookie ? JSON.parse(itemsCookie) : [];
  });
  const [showCartDrawer, setShowCartDrawer] = useState(false);
  const { data: productData } = useSWR("/api/products", fecther<ProductData[]>);

  useEffect(() => {
    setCookie("cartItems", cartItems);
  }, [cartItems]);

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

  const populatedCartItems = useMemo(
    () =>
      cartItems.map(cartItem => ({
        ...cartItem,
        product: productData?.find(product => product._id == cartItem.productId)
      })),
    [cartItems, productData]
  );

  const toggleShowCartDrawer = (value?: boolean) =>
    setShowCartDrawer(value ?? !showCartDrawer);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addItem,
        removeItem,
        updateItemQty,
        clearItems,
        populatedCartItems,
        showCartDrawer,
        toggleShowCartDrawer,
        productData
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
