import { CartContext, CartContextType } from "@/lib/CartContext";
import { useContext, useState, useEffect } from "react";
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
import ErrorMessage from "@/components/UI/ErrorMessage";
import Head from "next/head";
import styles from "@/styles/Checkout.module.scss";
import { PAYMENT_METHODS } from "@/lib/constants";
import axios from "axios";

export default function Checkout({
  hasInitialItems
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const { cartItems, clearItems } = useContext(CartContext) as CartContextType;
  const { register, control, getValues, handleSubmit, formState, watch } =
    useForm<CheckoutData>({ defaultValues: initialCheckoutData });
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>();
  const [completed, setCompleted] = useState(false);
  const [orderData, setOrderData] = useState<OrderData>();
  const [hasItems, setHasItems] = useState(hasInitialItems);

  useEffect(() => {
    setHasItems(cartItems.length > 0);
  }, [cartItems]);

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
      if (paymentMethod === PAYMENT_METHODS.CREDIT_CARD) {
        setShowPaymentModal(true);
      }
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
          {hasItems || completed ? (
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
              {error && !showPaymentModal && <ErrorMessage error={error} />}
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
  hasInitialItems: boolean;
}> = async ({ req }) => {
  const { cartItems: cartItemsCookie } = req.cookies;
  const cartItems = cartItemsCookie && JSON.parse(cartItemsCookie);
  return { props: { hasInitialItems: !!cartItems && cartItems.length > 0 } };
};
