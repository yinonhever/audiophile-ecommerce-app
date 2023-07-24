import { CheckoutData, PaymentMethod } from "@/lib/types";

const data: CheckoutData = {
  billingDetails: {
    name: "",
    email: "",
    phone: ""
  },
  shippingDetails: {
    address: "",
    zipCode: "",
    city: "",
    country: ""
  },
  paymentMethod: PaymentMethod.CreditCard
};

export default data;
