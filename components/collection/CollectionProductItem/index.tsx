import type { ProductData } from "@/models/Product";
import styles from "./CollectionProductItem.module.scss";
import ImageWithContent from "@/components/UI/ImageWithContent";
import Button from "@/components/UI/Button";
import Link from "next/link";

export default function CollectionProductItem({
  slug,
  title,
  categoryImage,
  isNewProduct,
  description,
  reverse
}: ProductData & { reverse?: boolean }) {
  return (
    <ImageWithContent
      tag="article"
      reverse={reverse}
      desktopImg={categoryImage.desktop}
      tabletImg={categoryImage.tablet}
      mobileImg={categoryImage.mobile}
      alt={title}
      link={`/products/${slug}`}
    >
      {isNewProduct && <h4 className={styles.label}>New product</h4>}
      <Link href={`/products/${slug}`}>
        <h2 className={styles.title}>{title}</h2>
      </Link>
      <p className={styles.description}>{description}</p>
      <Button colored link={`/products/${slug}`}>
        See product
      </Button>
    </ImageWithContent>
  );
}
