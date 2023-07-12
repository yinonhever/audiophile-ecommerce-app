import styles from "./Page.module.scss";
import { useEffect, PropsWithChildren } from "react";

export default function Page({ children }: PropsWithChildren) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return <div className={styles.page}>{children}</div>;
}
