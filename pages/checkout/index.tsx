import { CartContext, CartContextType, CartItem } from "@/lib/CartContext";
import { getCookie } from "cookies-next";
import { GetStaticProps, InferGetStaticPropsType } from "next";
import { getOrderPrice } from "../api/orders";
import { useContext, useEffect } from "react";
import type { BillingDetails, ShippingDetails } from "@/lib/types";
import { useForm } from "react-hook-form";

interface FormValues {
  billingDetails: BillingDetails;
  shippingDetails: ShippingDetails;
  paymentMethod: string;
}

export default function CheckoutPage({
  orderPrice
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const { populatedCartItems } = useContext(CartContext) as CartContextType;
  const { register, handleSubmit } = useForm<FormValues>({ mode: "onChange" });

  <div className="checkout-form">
    <input
      {...register("billingDetails.name")}
      className="checkout-form__input"
    />
  </div>;
  return <div></div>;
}

export const getStaticProps: GetStaticProps = async () => {
  try {
    const cartItemsCookie = getCookie("cartItems") as string;
    if (!cartItemsCookie) return { notFound: true };
    const cartItems: CartItem[] = JSON.parse(cartItemsCookie);
    const orderPrice = await getOrderPrice(cartItems);
    return { props: { orderPrice } };
  } catch (error: any) {
    console.log(error.message);
    return { notFound: true };
  }
};
