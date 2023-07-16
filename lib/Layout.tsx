import { PropsWithChildren } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Manrope } from "next/font/google";
import { cx } from "./functions";

const manrope = Manrope({ subsets: ["latin"] });

export default function Layout({ children }: PropsWithChildren) {
  return (
    <>
      <div className={cx("layout", manrope.className)}>
        <Header />
        {children}
        <Footer />
      </div>
    </>
  );
}
