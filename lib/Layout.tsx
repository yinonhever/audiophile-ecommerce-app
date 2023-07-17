import { PropsWithChildren, useEffect } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Manrope } from "next/font/google";
import { cx, fixTimeoutTransition } from "./functions";

const manrope = Manrope({ subsets: ["latin"] });

export default function Layout({ children }: PropsWithChildren) {
  useEffect(() => {
    fixTimeoutTransition(500);
  }, []);

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
