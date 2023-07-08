import styles from "./Spinner.module.scss";

export default function Spinner({ fixed }: { fixed?: boolean }) {
  const classes = [styles.spinner];
  if (fixed) classes.push(styles.fixed);
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
