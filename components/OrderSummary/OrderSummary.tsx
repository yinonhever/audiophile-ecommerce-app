import type { OrderPrice, PropsWithClassName } from "@/lib/types";
import type { CartItem } from "@/lib/CartContext";
import styles from "./OrderSummary.module.scss";
import type { ProductData } from "@/models/Product";

export default function OrderSummary({
  items,
  orderPrice,
  className,
  onSubmit
}: PropsWithClassName<{
  items: (CartItem & { product?: ProductData })[];
  orderPrice: OrderPrice;
  onSubmit: () => void;
}>) {
  return (
    <div className={`${styles.summary} ${className}`}>
      <button onClick={onSubmit}>Continue & pay</button>
    </div>
  );
}
