import styles from "./CollectionHeading.module.scss";
import Divider from "@/components/UI/Divider";

export default function CollectionHeading({ title }: { title: string }) {
  return (
    <section className={styles.wrapper}>
      <Divider />
      <h1 className={styles.heading}>{title}</h1>
    </section>
  );
}
