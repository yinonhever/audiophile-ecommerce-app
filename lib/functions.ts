import axios from "axios";
import { Document } from "mongoose";
import type { DataItem } from "./types";

export const fecther = async <T>(url: string) => {
  const { data } = await axios.get<T>(url);
  return data;
};

export const isValidEmail = (value: string) => /\S+@\S+\.\S+/.test(value);

export const isValidPhone = (value: string) => {
  if (value.startsWith("+")) {
    value = value.replace("+", "");
  }
  return isValidInteger(value) && value.length >= 6;
};

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
