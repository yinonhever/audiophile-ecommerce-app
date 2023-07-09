import "@/styles/globals.scss";
import type { AppProps } from "next/app";
import CartProvider from "@/lib/CartContext";
import Layout from "@/components/Layout";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <CartProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </CartProvider>
  );
}
