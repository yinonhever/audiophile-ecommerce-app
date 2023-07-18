import styles from "./Spinner.module.scss";
import { cx } from "@/lib/functions";

export default function Spinner({
  fixed,
  colored
}: {
  fixed?: boolean;
  colored?: boolean;
}) {
  return (
    <div
      className={cx(
        styles.spinner,
        fixed && styles.fixed,
        colored && styles.colored
      )}
    >
      <div className={styles["lds-ring"]}>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
}
