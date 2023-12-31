import axios from "axios";
import { Document } from "mongoose";
import type { DataItem, OrderPrice } from "./types";
import Router from "next/router";
import parsePhoneNumber from "libphonenumber-js";
import type { PopulatedCartItem } from "./CartContext";

export const fecther = async <T>(url: string) => {
  const { data } = await axios.get<T>(url);
  return data;
};

export const isValidEmail = (value: string) => /\S+@\S+\.\S+/.test(value);

export const isValidPhone = (value: string) =>
  parsePhoneNumber(value)?.isValid();

export const isValidInteger = (value: string) => /^\d+$/.test(value);

export const isValidZipCode = (value: string) =>
  isValidInteger(value) && value.length >= 5;

export const cx = (...classNames: (string | false | null | undefined)[]) =>
  classNames.filter(className => !!className).join(" ");

export const convertedNumber = (num?: number) => {
  if (num === undefined) return;
  if (isNaN(num)) throw new Error("Invalid number");
  let numStr = num.toString();
  let isNegative = false;
  if (numStr.startsWith("-")) {
    isNegative = true;
    numStr = numStr.replace("-", "");
  }
  const [integer, fraction] = numStr.split(".");
  const integerParts = integer.split("");
  for (let i = integer.length - 3; i > 0; i -= 3) {
    integerParts.splice(i, 0, ",");
  }
  let combinedNum = integerParts.join("");
  if (fraction) combinedNum += "." + fraction;
  if (isNegative) combinedNum = "-" + combinedNum;
  return combinedNum;
};

export const getConvertedItem = <T>(item: Document | DataItem<T>) => {
  const convertedItem = (
    item instanceof Document ? item.toObject() : { ...item }
  ) as DataItem<T>;
  convertedItem._id = convertedItem._id.toString();
  const { createdAt, updatedAt } = convertedItem;
  if (createdAt) {
    convertedItem.createdAt = new Date(createdAt).toISOString();
  }
  if (updatedAt) {
    convertedItem.updatedAt = new Date(updatedAt).toISOString();
  }
  return convertedItem;
};

export const calculateOrderPrice = (items: PopulatedCartItem[]): OrderPrice => {
  const itemsPrice = +items
    .reduce((sum, item) => sum + (item.product?.price ?? 0) * item.qty, 0)
    .toFixed(2);
  const shippingFee = 50;
  const vat = +((itemsPrice * 20) / 100).toFixed(2);
  const totalPrice = +(itemsPrice + shippingFee + vat).toFixed(2);
  return { itemsPrice, shippingFee, vat, totalPrice };
};

export const shortenedProductTitle = (title?: string) => {
  if (!title) return;
  const productTypes = ["Headphones", "Earphones", "Speaker"];
  const [modelName] = title.split(" ");
  return title
    .split(" ")
    .filter(x => x === modelName || productTypes.includes(x))
    .join(" ");
};

export const fixTimeoutTransition = (timeout: number) => {
  Router.events.on("beforeHistoryChange", () => {
    // Create a clone of every <style> and <link> that currently affects the page. It doesn't matter
    // if Next.js is going to remove them or not since we are going to remove the copies ourselves
    // later on when the transition finishes.
    const nodes = document.querySelectorAll(
      "link[rel=stylesheet], style:not([media=x])"
    );
    const copies = [...nodes].map(el => el.cloneNode(true) as HTMLElement);

    for (const copy of copies) {
      // Remove Next.js' data attributes so the copies are not removed from the DOM in the route
      // change process.
      copy.removeAttribute("data-n-p");
      copy.removeAttribute("data-n-href");

      // Add duplicated nodes to the DOM.
      document.head.appendChild(copy);
    }

    const handler = () => {
      // Emulate a `.once` method using `.on` and `.off`
      Router.events.off("routeChangeComplete", handler);

      window.setTimeout(() => {
        for (const copy of copies) {
          // Remove previous page's styles after the transition has finalized.
          document.head.removeChild(copy);
        }
      }, timeout);
    };

    Router.events.on("routeChangeComplete", handler);
  });
};
