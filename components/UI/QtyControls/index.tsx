import type { PropsWithClassName } from "@/lib/types";
import styles from "./QtyControls.module.scss";
import { cx } from "@/lib/functions";

export default function QtyControls({
  value,
  onChange,
  minValue,
  wide,
  className
}: PropsWithClassName<{
  value: number;
  onChange: (val: number) => void;
  minValue?: number;
  wide?: boolean;
}>) {
  return (
    <div className={cx(styles.container, wide && styles.wide, className)}>
      <button
        className={styles.control}
        disabled={minValue !== undefined && value <= minValue}
        onClick={() => onChange(value - 1)}
      >
        -
      </button>
      <span className={styles.count}>{value}</span>
      <button className={styles.control} onClick={() => onChange(value + 1)}>
        +
      </button>
    </div>
  );
}
