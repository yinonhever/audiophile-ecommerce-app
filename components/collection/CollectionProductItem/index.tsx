import type { ProductData } from "@/models/Product";
import styles from "./CollectionProductItem.module.scss";
import ImageWithContent from "@/components/UI/ImageWithContent";

export default function CollectionProductItem({
  slug,
  title,
  categoryImage: image,
  isNewProduct,
  description,
  reverse
}: ProductData & { reverse?: boolean }) {
  return (
    <ImageWithContent
      tag="article"
      reverse={reverse}
      desktopImg={image.desktop}
      tabletImg={image.tablet}
      mobileImg={image.mobile}
      alt={title}
      link={`/products/${slug}`}
    >
      content here...
    </ImageWithContent>
  );
}
