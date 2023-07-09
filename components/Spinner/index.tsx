import styles from "./Spinner.module.scss";

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
    <div className={classes.join(" ")}>
      <div className={styles["lds-ring"]}>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
}
