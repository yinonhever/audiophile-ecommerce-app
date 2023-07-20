import styles from "./About.module.scss";
import ImageWithContent from "@/components/UI/ImageWithContent";

export default function About() {
  return (
    <ImageWithContent
      desktopImg="/assets/shared/desktop/image-best-gear.jpg"
      tabletImg="/assets/shared/tablet/image-best-gear.jpg"
      mobileImg="/assets/shared/mobile/image-best-gear.jpg"
      alt="Bringing you the best audio gear"
      reverse
      extraSpaced
    >
      <h2 className={styles.heading}>
        Bringing you the <span className={styles.colored}>best</span> audio gear
      </h2>
      <p className={styles.text}>
        Located at the heart of New York City, Audiophile is the premier store
        for high end headphones, earphones, speakers, and audio accessories. We
        have a large showroom and luxury demonstration rooms available for you
        to browse and experience a wide range of our products. Stop by our store
        to meet some of the fantastic people who make Audiophile the best place
        to buy your portable audio equipment.
      </p>
    </ImageWithContent>
  );
}
