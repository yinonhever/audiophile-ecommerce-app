import { PropsWithChildren } from "react";
import styles from "./Modal.module.scss";
import { cx } from "@/lib/functions";

export default function Modal({
  active,
  children
}: PropsWithChildren<{ active: boolean }>) {
  return (
    <div className={cx(styles.container, active && styles.active)}>
      <div className={styles.content}>{children}</div>
    </div>
  );
}
