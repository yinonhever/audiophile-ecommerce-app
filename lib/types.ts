import { ReactNode } from "react";

export type DataItem<T> = T & { _id: string };

export type PropsWithChildren<T> = T & { children?: ReactNode };

export interface OrderPrice {
  itemsPrice: number;
  shippingFee: number;
  vat: number;
  totalPrice: number;
}

export interface BillingDetails {
  name: string;
  email: string;
  phone: string;
}

export interface ShippingDetails {
  address: string;
  zipCode: string;
  city: string;
  country: string;
}
