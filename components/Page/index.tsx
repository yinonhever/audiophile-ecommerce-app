import styles from "./Page.module.scss";
import type { PropsWithChildren } from "react";

export default function Page({ children }: PropsWithChildren) {
  return <div className={styles.page}>{children}</div>;
}
