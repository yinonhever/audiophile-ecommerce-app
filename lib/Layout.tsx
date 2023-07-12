import { PropsWithChildren } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export default function Layout({ children }: PropsWithChildren) {
  return (
    <div className="layout">
      <Header />
      {children}
      <Footer />
    </div>
  );
}
