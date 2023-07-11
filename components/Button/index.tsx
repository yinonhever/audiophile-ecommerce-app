import type { PropsWithChildren, MouseEventHandler } from "react";
import styles from "./Button.module.scss";
import { cx } from "@/lib/functions";
import Link from "next/link";

export default function Button({
  children,
  onClick,
  fullWidth,
  outlined,
  colored,
  link
}: PropsWithChildren<{
  onClick: MouseEventHandler<HTMLButtonElement>;
  fullWidth?: boolean;
  outlined?: boolean;
  colored?: boolean;
  link?: string;
}>) {
  const classes = [styles.button];
  if (fullWidth) classes.push(styles.fullWidth);
  if (outlined) classes.push(styles.outlined);
  if (colored) classes.push(styles.colored);
  return link ? (
    <Link className={cx(...classes)} href={link}>
      {children}
    </Link>
  ) : (
    <button className={cx(...classes)} onClick={onClick}>
      {children}
    </button>
  );
}
