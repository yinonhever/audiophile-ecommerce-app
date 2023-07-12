import axios from "axios";

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

export const cx = (...classNames: (string | boolean | null | undefined)[]) =>
  classNames.filter(className => !!className).join(" ");

export const convertedNumber = (n: number | string) => {
  if (isNaN(+n)) throw new Error("Invalid number");
  n = n.toString();
  let isNegative = false;
  if (n.startsWith("-")) {
    isNegative = true;
    n = n.replace("-", "");
  }
  const [integer, fraction] = n.split(".");
  const integerParts = integer.split("");
  for (let i = integer.length - 3; i > 0; i -= 3) {
    integerParts.splice(i, 0, ",");
  }
  let combinedNumber = integerParts.join("");
  if (fraction) combinedNumber += "." + fraction;
  if (isNegative) combinedNumber = "-" + combinedNumber;
  return combinedNumber;
};
