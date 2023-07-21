import styles from "./ProductSuggestionItem.module.scss";
import { ProductData } from "@/models/Product";
import Button from "@/components/UI/Button";
import Link from "next/link";

export default function ProductSuggestionItem({
  slug,
  title,
  image,
  categoryImage
}: ProductData) {
  const convertedTitle = title.replace("Headphones", "").trim();
  const link = `/products/${slug}`;
  return (
    <article className={styles.wrapper}>
      <Link className={styles.img} href={link}>
        <picture>
          <source media="(max-width: 600px)" srcSet={categoryImage.tablet} />
          <source media="(max-width: 1000px)" srcSet={image.tablet} />
          <img src={image.desktop} alt={title} />
        </picture>
      </Link>
      <Link href={link} className={styles.title}>
        <h4>{convertedTitle}</h4>
      </Link>
      <Button colored link={link}>
        See product
      </Button>
    </article>
  );
}
