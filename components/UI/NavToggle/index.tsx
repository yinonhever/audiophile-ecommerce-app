import { cx } from "@/lib/functions";
import styles from "./NavToggle.module.scss";
import type { MouseEventHandler } from "react";

export default function NavToggle({
  onClick,
  active
}: {
  onClick: MouseEventHandler;
  active: boolean;
}) {
  return (
    <span
      className={cx(styles.wrapper, active && styles.active)}
      onClick={onClick}
    >
      <span />
      <span />
      <span />
    </span>
  );
}
