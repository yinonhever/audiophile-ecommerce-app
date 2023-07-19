import { CartContext, CartContextType, CartItem } from "@/lib/CartContext";
import { useContext, useState } from "react";
import type { CheckoutData } from "@/lib/types";
import { SubmitHandler, useForm } from "react-hook-form";
import type { GetServerSideProps, InferGetServerSidePropsType } from "next";
import type { OrderData } from "@/models/Order";
import Page from "@/components/layout/Page";
import PaymentModal from "@/components/checkout/PaymentModal";
import CheckoutForm from "@/components/checkout/CheckoutForm";
import initialCheckoutData from "@/lib/assets/initial-checkout-data.json";
import CheckoutSummary from "@/components/checkout/CheckoutSummary";
import Overlay from "@/components/UI/Overlay";
import Spinner from "@/components/UI/Spinner";
import OrderConfirmation from "@/components/checkout/OrderConfirmation";
import GoBackButton from "@/components/UI/GoBackButton";
import Head from "next/head";
import styles from "@/styles/Checkout.module.scss";
import { PAYMENT_METHODS } from "@/lib/constants";
import axios from "axios";

export default function Checkout({
  hasCartItems
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const { cartItems, clearItems } = useContext(CartContext) as CartContextType;
  const { register, control, getValues, handleSubmit, formState, watch } =
    useForm<CheckoutData>({ defaultValues: initialCheckoutData });
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>();
  const [completed, setCompleted] = useState(false);
  const [orderData, setOrderData] = useState<OrderData>();

  const onSubmit: SubmitHandler<CheckoutData> = ({ paymentMethod }) => {
    if (paymentMethod === PAYMENT_METHODS.CREDIT_CARD) {
      setShowPaymentModal(true);
    } else if (paymentMethod === PAYMENT_METHODS.CASH) {
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
          {hasCartItems ? (
            <>
              <div className={styles.content}>
                <CheckoutForm
                  register={register}
                  control={control}
                  errors={formState.errors}
                  watch={watch}
                />
                <CheckoutSummary onSubmit={handleSubmit(onSubmit)} />
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
  hasCartItems: boolean;
}> = async context => {
  try {
    const { cartItems: cartItemsCookie } = context.req.cookies;
    if (!cartItemsCookie) return { props: { hasCartItems: false } };
    const cartItems = JSON.parse(cartItemsCookie) as CartItem[];
    if (!Array.isArray(cartItems) || !cartItems?.length)
      return { props: { hasCartItems: false } };
    return { props: { hasCartItems: true } };
  } catch (error: any) {
    console.log(error.message);
    return { props: { hasCartItems: false } };
  }
};
