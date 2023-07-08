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
  return isValidInteger(value) && value.length >= 6 ;
};

export const isValidInteger = (value: string) => /^\d+$/.test(value);
