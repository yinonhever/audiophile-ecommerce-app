import { ProductData } from "@/models/Product";
import { createContext, useState, useMemo, ReactNode } from "react";
import useSWR from "swr";
import { fecther } from "./functions";
import cloneDeep from "clone-deep";

type CartItem = {
  productId: string;
  qty: number;
};

type PopulatedCartItem = CartItem & { product?: ProductData };

type CartContextType = {
  cartItems: CartItem[];
  addItem: (productId: string) => void;
  removeItem: (productId: string) => void;
  updateItemQty: (productId: string, qty: number) => void;
  clearItems: () => void;
  populatedCartItems: PopulatedCartItem[];
  showCartDrawer: boolean;
  setShowCartDrawer: (value: boolean) => void;
  toggleShowCartDrawer: () => void;
  productData: ProductData[] | undefined;
};

const CartContext = createContext<CartContextType | null>(null);

const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [showCartDrawer, setShowCartDrawer] = useState(false);
  const { data: productData } = useSWR("/api/products", fecther<ProductData[]>);

  const addItem = (productId: string) => {
    const clonedItems = cloneDeep(cartItems);
    const existingItem = clonedItems.find(item => item.productId === productId);
    if (existingItem) {
      existingItem.qty++;
      setCartItems(clonedItems);
    } else {
      const newItem = { productId, qty: 1 };
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

  const populatedCartItems: PopulatedCartItem[] = useMemo(
    () =>
      cartItems.map(cartItem => {
        const matchingProductItem = productData?.find(
          product => product._id == cartItem.productId
        );
        if (!matchingProductItem) return cartItem;
        return { ...cartItem, product: matchingProductItem };
      }),
    [cartItems, productData]
  );

  const toggleShowCartDrawer = () => setShowCartDrawer(!showCartDrawer);

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
        setShowCartDrawer,
        toggleShowCartDrawer,
        productData
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
