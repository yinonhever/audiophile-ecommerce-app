import { CartContext, CartContextType, CartItem } from "@/lib/CartContext";
import { getOrderPrice } from "../api/orders";
import { useContext, useState, useRef } from "react";
import type { BillingDetails, OrderPrice, ShippingDetails } from "@/lib/types";
import { SubmitHandler, useForm } from "react-hook-form";
import type { GetServerSideProps, InferGetServerSidePropsType } from "next";
import axios from "axios";
import type { OrderData } from "@/models/Order";
import PaymentModal from "@/components/PaymentModal/PaymentModal";
import styles from "@/styles/Checkout.module.scss";
import CheckoutForm from "@/components/CheckoutForm/CheckoutForm";
import initialCheckoutData from "@/lib/util/initial-checkout-data.json";
import OrderSummary from "@/components/OrderSummary/OrderSummary";

export interface CheckoutData {
  billingDetails: BillingDetails;
  shippingDetails: ShippingDetails;
  paymentMethod: string;
}

export default function Checkout({
  orderPrice
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const { cartItems, populatedCartItems, clearItems } = useContext(
    CartContext
  ) as CartContextType;
  const displayedCartItems = useRef([...populatedCartItems]);
  const { register, getValues, handleSubmit, formState } =
    useForm<CheckoutData>({ defaultValues: initialCheckoutData });
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | string | object | null>();
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
      console.log("successfully created order", data);
      setCompleted(true);
      setOrderData(data);
      setError(null);
      clearItems();
    } catch (error: any) {
      console.log("failed to create order", error);
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.checkout}>
      {orderPrice ? (
        <>
          <main className={styles.container}>
            <CheckoutForm
              className={styles.section}
              register={register}
              errors={formState.errors}
            />
            <OrderSummary
              className={styles.section}
              items={displayedCartItems.current}
              orderPrice={orderPrice}
              onSubmit={handleSubmit(onSubmit)}
            />
          </main>
          <PaymentModal active={showPaymentModal} onPayment={submitOrder} />
        </>
      ) : (
        <div className={styles.empty}>Your cart is empty.</div>
      )}
    </div>
  );
}

export const getServerSideProps: GetServerSideProps<{
  orderPrice: OrderPrice | null;
}> = async context => {
  try {
    const { cartItems: cartItemsCookie } = context.req.cookies;
    if (!cartItemsCookie) return { props: { orderPrice: null } };
    const cartItems = JSON.parse(cartItemsCookie) as CartItem[];
    if (!Array.isArray(cartItems) || !cartItems?.length)
      return { props: { orderPrice: null } };
    const orderPrice = await getOrderPrice(cartItems);
    return { props: { orderPrice } };
  } catch (error: any) {
    console.log(error.message);
    return { notFound: true };
  }
};
