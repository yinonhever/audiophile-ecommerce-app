import { PropsWithClassName } from "@/lib/types";
import styles from "./Divider.module.scss";
import { cx } from "@/lib/functions";

export default function Divider({ className }: PropsWithClassName) {
  return <div className={cx(styles.divider, className)} />;
}
