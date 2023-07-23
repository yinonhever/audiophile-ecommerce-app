import { ProductData } from "@/models/Product";
import styles from "./FeaturedProducts.module.scss";
import { Fade } from "react-awesome-reveal";
import { cx, shortenedProductTitle } from "@/lib/functions";
import Button from "@/components/UI/Button";
import Image from "next/image";

export default function FeaturedProducts({
  products
}: {
  products: ProductData[];
}) {
  const [firstProduct, secondProduct, thirdProduct] = products;
  return (
    <section className={styles.wrapper}>
      <Fade duration={600} direction="right" triggerOnce>
        <article className={styles.item}>
          <div className={cx(styles.box, styles.heroBox)}>
            <div className={styles.heroBox__bg}>
              <Image
                className={styles.heroBox__pattern}
                src="/assets/home/desktop/pattern-circles.svg"
                alt="Background pattern"
                fill
              />
              <picture>
                <source
                  media="(max-width: 600px)"
                  srcSet={firstProduct?.homepageImage?.mobile}
                />
                <source
                  media="(max-width: 1000px)"
                  srcSet={firstProduct?.homepageImage?.tablet}
                />
                <img
                  src={firstProduct?.homepageImage?.desktop}
                  alt={firstProduct?.title}
                  className={styles.heroBox__img}
                />
              </picture>
            </div>
            <div className={styles.heroBox__content}>
              <h2 className={styles.heroBox__title}>
                {shortenedProductTitle(firstProduct?.title)}
              </h2>
              <p className={styles.heroBox__text}>{firstProduct?.heroText}</p>
              <Button link={`/products/${firstProduct?.slug}`}>
                See product
              </Button>
            </div>
          </div>
        </article>
      </Fade>
      <Fade duration={600} direction="left" triggerOnce>
        <article className={styles.item}>
          <div className={cx(styles.box, styles.titleBox)}>
            <picture>
              <source
                media="(max-width: 600px)"
                srcSet={secondProduct?.homepageImage?.mobile}
              />
              <source
                media="(max-width: 1000px)"
                srcSet={secondProduct?.homepageImage?.tablet}
              />
              <img
                src={secondProduct?.homepageImage?.desktop}
                alt={secondProduct?.title}
                className={styles.titleBox__img}
              />
            </picture>
            <div className={styles.titleBox__content}>
              <h2 className={styles.titleBox__title}>
                {shortenedProductTitle(secondProduct?.title)}
              </h2>
              <Button link={`/products/${secondProduct?.slug}`}>
                See product
              </Button>
            </div>
          </div>
        </article>
      </Fade>
      <Fade duration={600} direction="right" triggerOnce>
        <article className={cx(styles.item, styles.splitted)}>
          <div className={cx(styles.box, styles.titleBox)}>
            <picture>
              <source
                media="(max-width: 600px)"
                srcSet={thirdProduct?.homepageImage?.mobile}
              />
              <source
                media="(max-width: 1000px)"
                srcSet={thirdProduct?.homepageImage?.tablet}
              />
              <img
                src={thirdProduct?.homepageImage?.desktop}
                alt={thirdProduct?.title}
                className={styles.titleBox__img}
              />
            </picture>
          </div>
          <div className={cx(styles.box, styles.titleBox)}>
            <div className={styles.titleBox__content}>
              <h2 className={styles.titleBox__title}>
                {shortenedProductTitle(thirdProduct?.title)}
              </h2>
              <Button link={`/products/${thirdProduct?.slug}`}>
                See product
              </Button>
            </div>
          </div>
        </article>
      </Fade>
    </section>
  );
}
