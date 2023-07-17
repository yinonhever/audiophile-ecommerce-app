import { CartContext, CartContextType, CartItem } from "@/lib/CartContext";
import { getOrderPrice } from "../api/orders";
import { useContext, useState } from "react";
import type { OrderPrice, CheckoutData } from "@/lib/types";
import { SubmitHandler, useForm } from "react-hook-form";
import type { GetServerSideProps, InferGetServerSidePropsType } from "next";
import type { OrderData } from "@/models/Order";
import Page from "@/components/layout/Page";
import PaymentModal from "@/components/checkout/PaymentModal";
import CheckoutForm from "@/components/checkout/CheckoutForm";
import initialCheckoutData from "@/lib/util/initial-checkout-data.json";
import CheckoutSummary from "@/components/checkout/CheckoutSummary";
import Overlay from "@/components/UI/Overlay";
import Spinner from "@/components/UI/Spinner";
import OrderConfirmation from "@/components/checkout/OrderConfirmation";
import GoBackButton from "@/components/UI/GoBackButton";
import Head from "next/head";
import styles from "@/styles/Checkout.module.scss";
import axios from "axios";

export default function Checkout({
  orderPrice
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const { cartItems, clearItems } = useContext(CartContext) as CartContextType;
  const { register, getValues, handleSubmit, formState } =
    useForm<CheckoutData>({ defaultValues: initialCheckoutData });
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>();
  const [completed, setCompleted] = useState(false);
  const [orderData, setOrderData] = useState<OrderData>();

  const onSubmit: SubmitHandler<CheckoutData> = ({ paymentMethod }) => {
    if (paymentMethod === "credit-card") {
      setShowPaymentModal(true);
    } else if (paymentMethod === "cash") {
      submitOrder();
    }
  };

  const submitOrder = async (nonce?: string) => {
    const { billingDetails, shippingDetails, paymentMethod } = getValues();
    setLoading(true);
    setShowPaymentModal(false);
    try {
      const { data } = await axios.post<OrderData>("/api/orders", {
        cartItems,
        billingDetails,
        shippingDetails,
        paymentMethod,
        nonce
      });
      setCompleted(true);
      setOrderData(data);
      setError(null);
      clearItems();
    } catch (error: any) {
      setError(error);
      setShowPaymentModal(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Checkout – Audiophile</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Page>
        <main className={styles.container}>
          <GoBackButton className={styles.goBack} />
          {orderPrice ? (
            <>
              <div className={styles.content}>
                <CheckoutForm register={register} errors={formState.errors} />
                <CheckoutSummary
                  orderPrice={orderPrice}
                  onSubmit={handleSubmit(onSubmit)}
                />
              </div>
              <Overlay
                active={showPaymentModal || loading || completed}
                onClick={() => setShowPaymentModal(false)}
              />
              {loading && <Spinner fixed />}
              <PaymentModal
                active={showPaymentModal}
                onPayment={submitOrder}
                error={error}
              />
              <OrderConfirmation active={completed} orderData={orderData} />
            </>
          ) : (
            <div className={styles.empty}>Your cart is empty.</div>
          )}
        </main>
      </Page>
    </>
  );
}

export const getServerSideProps: GetServerSideProps<{
  orderPrice: OrderPrice | null;
}> = async context => {
  try {
    const { cartItems: cartItemsCookie } = context.req.cookies;
    if (!cartItemsCookie) throw new Error("No cookie found");
    const cartItems = JSON.parse(cartItemsCookie) as CartItem[];
    // if (!Array.isArray(cartItems) || !cartItems?.length)
    //   throw new Error("No cart items found");
    const orderPrice = await getOrderPrice(cartItems);
    return { props: { orderPrice } };
  } catch (error: any) {
    console.log(error.message);
    return { props: { orderPrice: null } };
  }
};
