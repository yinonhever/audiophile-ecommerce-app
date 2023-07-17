import "@/styles/globals.scss";
import type { AppProps } from "next/app";
import CartProvider from "@/lib/CartContext";
import Layout from "@/lib/Layout";
import { AnimatePresence } from "framer-motion";
import ProgressBar from "nextjs-progressbar";
import NProgress from "nprogress";

NProgress.configure({ showSpinner: false });

export default function App({ Component, pageProps, router }: AppProps) {
  return (
    <CartProvider>
      <ProgressBar color="#d87d4a" height={4} />
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
