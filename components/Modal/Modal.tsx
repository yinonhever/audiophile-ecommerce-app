import { PropsWithChildren } from "react";
import styles from "./Modal.module.scss";

export default function Modal({
  active,
  children
}: PropsWithChildren<{ active: boolean }>) {
  return (
    <div className={`${styles.modal} ${active ? styles.active : ""}`}>
      {children}
    </div>
  );
}
