import { Schema, model, models, Model, Types } from "mongoose";
import type {
  BillingDetails,
  ShippingDetails,
  DataItem,
  OrderPrice
} from "@/lib/types";
import type { ProductData } from "./Product";
import { PAYMENT_METHODS } from "@/lib/constants";

interface IOrder {
  items: {
    product: Types.ObjectId | ProductData;
    price: number;
    qty: number;
  }[];
  price: OrderPrice;
  billingDetails: BillingDetails;
  shippingDetails: ShippingDetails;
  paymentMethod: string;
  isPaid: boolean;
  paymentResult: object | null;
}

export type OrderData = DataItem<IOrder>;

const orderSchema = new Schema<IOrder>(
  {
    items: [
      {
        product: {
          type: Schema.Types.ObjectId,
          ref: "Product",
          required: true
        },
        price: {
          type: Number,
          required: true
        },
        qty: {
          type: Number,
          required: true
        }
      }
    ],
    price: {
      itemsPrice: {
        type: Number,
        required: true
      },
      shippingFee: {
        type: Number,
        required: true
      },
      vat: {
        type: Number,
        required: true
      },
      totalPrice: {
        type: Number,
        required: true
      }
    },
    billingDetails: {
      name: {
        type: String,
        required: true
      },
      email: {
        type: String,
        required: true
      },
      phone: {
        type: String,
        required: true
      }
    },
    shippingDetails: {
      address: {
        type: String,
        required: true
      },
      zipCode: {
        type: String,
        required: true
      },
      city: {
        type: String,
        required: true
      },
      country: {
        type: String,
        required: true,
        trim: true,
        minlength: 2,
        maxlength: 2
      }
    },
    paymentMethod: {
      type: String,
      required: true,
      enum: [PAYMENT_METHODS.CREDIT_CARD, PAYMENT_METHODS.CASH]
    },
    isPaid: {
      type: Boolean,
      default: false
    },
    paymentResult: {
      type: Object,
      default: null
    }
  },
  { timestamps: true }
);

const Order: Model<IOrder> =
  models.Order || model<IOrder>("Order", orderSchema);

export default Order;
