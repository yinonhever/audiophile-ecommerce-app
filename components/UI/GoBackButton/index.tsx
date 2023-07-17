import { PropsWithClassName } from "@/lib/types";
import styles from "./GoBackButton.module.scss";
import { useRouter } from "next/router";
import { cx } from "@/lib/functions";

export default function GoBackButton({ className }: PropsWithClassName) {
  const { back } = useRouter();

  return (
    <div className={cx(styles.wrapper, className)}>
      <button className={styles.button} onClick={back}>
        Go back
      </button>
    </div>
  );
}
