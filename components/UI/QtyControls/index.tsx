import type { PropsWithClassName } from "@/lib/types";
import styles from "./QtyControls.module.scss";
import { cx } from "@/lib/functions";

export default function QtyControls({
  value,
  onChange,
  className
}: PropsWithClassName<{
  value: number;
  onChange: (val: number) => void;
}>) {
  return (
    <div className={cx(styles.container, className)}>
      <button className={styles.control} onClick={() => onChange(value + 1)}>
        +
      </button>
      <span className={styles.count}>{value}</span>
      <button className={styles.control} onClick={() => onChange(value - 1)}>
        -
      </button>
    </div>
  );
}
