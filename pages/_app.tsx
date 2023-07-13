import "@/styles/globals.scss";
import type { AppProps } from "next/app";
import CartProvider from "@/lib/CartContext";
import Layout from "@/lib/Layout";
import { AnimatePresence } from "framer-motion";
import NextProgress from "nextjs-progressbar";

export default function App({ Component, pageProps, router }: AppProps) {
  return (
    <CartProvider>
      <NextProgress />
      <Layout>
        <AnimatePresence
          mode="wait"
          initial={false}
          onExitComplete={() => window.scrollTo(0, 0)}
        >
          <Component {...pageProps} key={router.asPath} />
        </AnimatePresence>
      </Layout>
    </CartProvider>
  );
}
