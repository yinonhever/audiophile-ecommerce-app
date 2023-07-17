import type { PropsWithChildren, MouseEventHandler } from "react";
import styles from "./Button.module.scss";
import { cx } from "@/lib/functions";
import Link from "next/link";

export default function Button({
  children,
  onClick,
  link,
  fullWidth,
  outlined,
  colored
}: PropsWithChildren<{
  onClick?: MouseEventHandler;
  link?: string;
  fullWidth?: boolean;
  outlined?: boolean;
  colored?: boolean;
}>) {
  const classes = cx(
    styles.button,
    fullWidth && styles.fullWidth,
    outlined && styles.outlined,
    colored && styles.colored
  );

  return link ? (
    <Link className={classes} href={link}>
      {children}
    </Link>
  ) : (
    <button className={classes} onClick={onClick}>
      {children}
    </button>
  );
}
