import type { ProductData } from "@/models/Product";
import styles from "./ProductFeatures.module.scss";
import { Fade } from "react-awesome-reveal";

export default function ProductFeatures({
  features,
  includedItems
}: ProductData) {
  return (
    <section className={styles.wrapper}>
      <div className={styles.subsection}>
        <Fade duration={350} direction="left" cascade triggerOnce>
          <h3 className={styles.title}>Features</h3>
          <div className={styles.content}>
            <Fade
              duration={450}
              direction="left"
              cascade
              triggerOnce
              className={styles.text}
            >
              {features
                ?.split("\n")
                .filter(x => x.trim())
                .map(paragraph => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
            </Fade>
          </div>
        </Fade>
      </div>
      <div className={styles.subsection}>
        <Fade duration={350} direction="right" cascade triggerOnce>
          <div className={styles.splitted}>
            <h3 className={styles.title}>In the box</h3>
            <div className={styles.content}>
              <Fade
                duration={350}
                direction="right"
                cascade
                triggerOnce
                className={styles.list}
              >
                {includedItems?.map(include => (
                  <div key={include.item} className={styles.item}>
                    <span className={styles.item__count}>
                      {include.quantity}x
                    </span>
                    <span className={styles.item__text}>{include.item}</span>
                  </div>
                ))}
              </Fade>
            </div>
          </div>
        </Fade>
      </div>
    </section>
  );
}
