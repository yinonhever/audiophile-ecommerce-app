import { cx } from "@/lib/functions";
import styles from "./ImageWithContent.module.scss";
import { PropsWithChildren } from "react";

export default function ImageWithContent({
  desktopImg,
  tabletImg,
  mobileImg,
  alt,
  reverse,
  twoColumnsTablet,
  tag,
  className,
  children
}: PropsWithChildren<{
  desktopImg: string;
  tabletImg?: string;
  mobileImg?: string;
  alt: string;
  reverse?: boolean;
  twoColumnsTablet?: boolean;
  tag?: "section" | "div";
  className?: string;
}>) {
  const Tag = tag || "section";
  return (
    <Tag className={cx(styles.container, reverse && styles.reverse, className)}>
      <div className={styles.img}>
        <picture>
          {tabletImg && (
            <source media="(max-width: 1000px)" srcSet={tabletImg} />
          )}
          {mobileImg && (
            <source media="(max-width: 600px)" srcSet={mobileImg} />
          )}
          <img src={desktopImg} alt={alt} />
        </picture>
      </div>
      <div className={styles.content}>{children}</div>
    </Tag>
  );
}
