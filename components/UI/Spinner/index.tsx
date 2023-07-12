import styles from "./Spinner.module.scss";
import { cx } from "@/lib/functions";

export default function Spinner({
  fixed,
  colored
}: {
  fixed?: boolean;
  colored?: boolean;
}) {
  const classes = [styles.spinner];
  if (fixed) classes.push(styles.fixed);
  if (colored) classes.push(styles.colored);
  return (
    <div className={cx(...classes)}>
      <div className={styles["lds-ring"]}>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
}
