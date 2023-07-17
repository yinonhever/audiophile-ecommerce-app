import styles from "./CollectionHeading.module.scss";

export default function CollectionHeading({ title }: { title: string }) {
  return (
    <section className={styles.wrapper}>
      <h1 className={styles.heading}>{title}</h1>
    </section>
  );
}
