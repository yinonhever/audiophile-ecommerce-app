import { PropsWithClassName } from "@/lib/types";
import styles from "./Logo.module.scss";
import Link from "next/link";
import { cx } from "@/lib/functions";

export default function Logo({ className }: PropsWithClassName) {
  return (
    <Link href="/" className={cx(styles.logo, className)}>
      <img src="" alt="Audiophile" />
    </Link>
  );
}
