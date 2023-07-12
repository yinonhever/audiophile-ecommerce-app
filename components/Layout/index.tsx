import styles from "./Layout.module.scss";
import { PropsWithChildren } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function Layout({ children }: PropsWithChildren) {
  return (
    <div className={styles.wrapper}>
      <Header />
      {children}
      <Footer />
    </div>
  );
}
