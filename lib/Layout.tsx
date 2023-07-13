import { PropsWithChildren } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import NextProgress from "nextjs-progressbar";

export default function Layout({ children }: PropsWithChildren) {
  return (
    <>
      <NextProgress color="#E07C4C" height={4} />
      <div className="layout">
        <Header />
        {children}
        <Footer />
      </div>
    </>
  );
}
