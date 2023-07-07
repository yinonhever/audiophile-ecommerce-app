import { OrderPrice } from "@/lib/types";
import styles from "./OrderSummary.module.scss";

export default function OrderSummary({
  orderPrice,
  className,
  onSubmit
}: {
  orderPrice: OrderPrice;
  className?: string;
  onSubmit: () => void;
}) {
  return (
    <div className={styles.summary}>
      <button onClick={onSubmit}>Continue & pay</button>
    </div>
  );
}
