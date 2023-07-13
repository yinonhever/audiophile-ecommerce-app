import { cx } from "@/lib/functions";
import styles from "./Overlay.module.scss";
import { MouseEventHandler } from "react";
import { PropsWithClassName } from "@/lib/types";

export default function Overlay({
  active,
  onClick,
  className
}: PropsWithClassName<{
  active: boolean;
  onClick?: MouseEventHandler;
}>) {
  return (
    <div
      className={cx(styles.overlay, className, active && styles.active)}
      onClick={onClick}
    />
  );
}
