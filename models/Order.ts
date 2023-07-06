import { Schema, model, models, Model, Types } from "mongoose";
import type { BillingDetails, ShippingDetails, DataItem } from "@/lib/types";
import { ProductData } from "./Product";

interface IOrder {
  items: { product: Types.ObjectId | ProductData; qty: number }[];
  price: {
    itemsPrice: number;
    shippingFee: number;
    vat: number;
    totalPrice: number;
  };
  billingDetails: BillingDetails;
  shippingDetails: ShippingDetails;
  paymentMethod: string;
  isPaid: boolean;
  paymentResult: object | null;
}

export type OrderData = DataItem<IOrder>;

const orderSchema = new Schema<IOrder>({
  items: [
    {
      product: {
        type: Schema.Types.ObjectId,
        ref: "Product",
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
    enum: ["e-money", "cash"]
  },
  isPaid: {
    type: Boolean,
    default: false
  },
  paymentResult: {
    type: Object,
    default: null
  }
});

const Order: Model<IOrder> =
  models.Order || model<IOrder>("Order", orderSchema);

export default Order;
