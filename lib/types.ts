export type DataItem<T = unknown> = T & {
  _id: string;
  createdAt: Date | string;
  updatedAt: Date | string;
};

export type PropsWithClassName<T = unknown> = T & { className?: string };

export interface ProductImage {
  desktop: string;
  tablet: string;
  mobile: string;
}

export interface ProductInclude {
  item: string;
  quantity: number;
}

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

export interface CheckoutData {
  billingDetails: BillingDetails;
  shippingDetails: ShippingDetails;
  paymentMethod: string;
}
