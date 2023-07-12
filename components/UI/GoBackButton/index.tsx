import styles from "./GoBackButton.module.scss";
import { useRouter } from "next/router";

export default function GoBackButton() {
  const { back } = useRouter();

  return (
    <div className={styles.wrapper}>
      <button className={styles.button} onClick={back}>
        Go back
      </button>
    </div>
  );
}
