import type { PropsWithClassName } from "@/lib/types";
import styles from "./QtyControls.module.scss";
import { cx } from "@/lib/functions";

export default function QtyControls({
  value,
  onChange,
  minValue,
  maxValue,
  wide,
  tile,
  className
}: PropsWithClassName<{
  value: number;
  onChange: (val: number) => void;
  minValue?: number;
  maxValue?: number;
  wide?: boolean;
  tile?: boolean;
}>) {
  return (
    <div
      className={cx(
        styles.container,
        wide && styles.wide,
        tile && styles.tile,
        className
      )}
    >
      <button
        className={styles.control}
        disabled={minValue !== undefined && value <= minValue}
        onClick={() => onChange(value - 1)}
      >
        -
      </button>
      <span className={styles.count}>{value}</span>
      <button
        className={styles.control}
        disabled={maxValue !== undefined && value >= maxValue}
        onClick={() => onChange(value + 1)}
      >
        +
      </button>
    </div>
  );
}
