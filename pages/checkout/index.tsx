import { CartContext, CartContextType, CartItem } from "@/lib/CartContext";
import { getOrderPrice } from "../api/orders";
import { useContext, useState, useEffect, useRef } from "react";
import type { BillingDetails, OrderPrice, ShippingDetails } from "@/lib/types";
import { SubmitHandler, useForm } from "react-hook-form";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import axios from "axios";
import type { OrderData } from "@/models/Order";
import PaymentModal from "@/components/PaymentModal/PaymentModal";

interface CheckoutData {
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
  const { register, getValues, handleSubmit } = useForm<CheckoutData>();
  const [showDropin, setShowDropin] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | string | object | null>();
  const [completed, setCompleted] = useState(false);
  const [orderData, setOrderData] = useState<OrderData>();
  const displayedCartItems = useRef([...populatedCartItems]);

  const onSubmit: SubmitHandler<CheckoutData> = ({ paymentMethod }) => {
    if (paymentMethod === "credit-card") {
      setShowDropin(true);
    } else if (paymentMethod === "cash") {
      submitOrder();
    }
  };

  const submitOrder = async (nonce?: string) => {
    const { billingDetails, shippingDetails, paymentMethod } = getValues();
    setLoading(true);
    setShowDropin(false);
    try {
      const { data } = await axios.post<OrderData>("/api/orders", {
        items: cartItems,
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
    <div>
      <button onClick={() => setShowDropin(true)}>Proceed to checkout</button>
      <PaymentModal active={showDropin} onPayment={submitOrder} />
    </div>
  );
}

export const getServerSideProps: GetServerSideProps<{
  orderPrice: OrderPrice;
}> = async context => {
  try {
    const { cartItems: cartItemsCookie } = context.req.cookies;
    if (!cartItemsCookie) return { notFound: true };
    const cartItems = JSON.parse(cartItemsCookie) as CartItem[];
    // if (!cartItems.length) return { notFound: true };
    const orderPrice = await getOrderPrice(cartItems);
    return { props: { orderPrice: orderPrice } };
  } catch (error: any) {
    console.log(error.message);
    return { notFound: true };
  }
};
