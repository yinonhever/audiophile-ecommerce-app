import { OrderData } from "@/models/Order";
import styles from "./OrderConfirmation.module.scss";
import Modal from "@/components/UI/Modal";
import { convertedNumber } from "@/lib/functions";
import { ProductData } from "@/models/Product";
import Link from "next/link";
import Button from "@/components/UI/Button";

interface OrderItem {
  product: ProductData;
  price: number;
  qty: number;
}

export default function OrderConfirmation({
  orderData,
  active
}: {
  orderData?: OrderData;
  active: boolean;
}) {
  return (
    <Modal active={active}>
      <div className={styles.wrapper}>
        <svg
          className={styles.icon}
          width="64"
          height="64"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g fill="none" fillRule="evenodd">
            <circle fill="#D87D4A" cx="32" cy="32" r="32" />
            <path
              stroke="#FFF"
              strokeWidth="4"
              d="m20.754 33.333 6.751 6.751 15.804-15.803"
            />
          </g>
        </svg>
        <h3 className={styles.title}>
          Thank you
          <br />
          for your order
        </h3>
        <p className={styles.text}>
          You will receive an email confirmation shortly.
        </p>
        <div className={styles.summary}>
          <div className={styles.items}>
            <div className={styles.list}>
              {(orderData?.items as OrderItem[])?.map(
                ({ product, price, qty }) => (
                  <div key={product._id} className={styles.item}>
                    <Link
                      className={styles.item__img}
                      href={`/products/${product.slug}`}
                    >
                      <img src={product.image.desktop} alt={product.title} />
                    </Link>
                    <div className={styles.item__content}>
                      <div className={styles.item__main}>
                        <Link
                          className={styles.item__title}
                          href={`/products/${product?.slug}`}
                        >
                          {product?.shortTitle}
                        </Link>
                        <span className={styles.item__price}>
                          $ {convertedNumber(price)}
                        </span>
                      </div>
                      <span className={styles.item__count}>
                        <span className={styles.x}>x</span>
                        {qty}
                      </span>
                    </div>
                  </div>
                )
              )}
            </div>
          </div>
          <div className={styles.total}>
            <div className={styles.total__container}>
              <span className={styles.total__label}>Grand total</span>
              <span className={styles.total__amount}>
                $ {convertedNumber(orderData?.price.totalPrice)}
              </span>
            </div>
          </div>
        </div>
        <Button fullWidth colored link="/">
          Back to home
        </Button>
      </div>
    </Modal>
  );
}
