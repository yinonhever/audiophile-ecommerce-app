import { cx } from "@/lib/functions";
import styles from "./ImageWithContent.module.scss";
import { PropsWithChildren } from "react";
import Link from "next/link";
import { Fade } from "react-awesome-reveal";

export default function ImageWithContent({
  desktopImg,
  tabletImg,
  mobileImg,
  alt,
  link,
  reverse,
  twoColumnsTablet,
  extraSpaced,
  tag,
  className,
  children
}: PropsWithChildren<{
  desktopImg: string;
  tabletImg?: string;
  mobileImg?: string;
  alt: string;
  link?: string;
  reverse?: boolean;
  twoColumnsTablet?: boolean;
  extraSpaced?: boolean;
  tag?: "section" | "div" | "article";
  className?: string;
}>) {
  const Tag = tag || "section";
  const ImageContainerTag = link ? Link : "div";
  return (
    <Tag
      className={cx(
        styles.container,
        reverse && styles.reverse,
        twoColumnsTablet && styles.twoColumnsTablet,
        extraSpaced && styles.extraSpaced,
        className
      )}
    >
      <Fade duration={600} direction={reverse ? "right" : "left"} triggerOnce>
        <ImageContainerTag className={styles.img} href={link || ""}>
          <picture>
            <source media="(max-width: 600px)" srcSet={mobileImg} />
            <source media="(max-width: 1000px)" srcSet={tabletImg} />
            <img src={desktopImg} alt={alt} />
          </picture>
        </ImageContainerTag>
      </Fade>
      <div className={styles.content}>
        <Fade
          duration={350}
          direction={reverse ? "left" : "right"}
          cascade
          triggerOnce
        >
          {children}
        </Fade>
      </div>
    </Tag>
  );
}
