import { cx } from "@/lib/functions";
import styles from "./Overlay.module.scss";
import { MouseEventHandler } from "react";

export default function Overlay({
  active,
  onClick
}: {
  active: boolean;
  onClick?: MouseEventHandler;
}) {
  return (
    <div
      className={cx(styles.overlay, active && styles.active)}
      onClick={onClick}
    />
  );
}
