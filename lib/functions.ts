import axios from "axios";

export const fecther = async <T>(url: string) => {
  const { data } = await axios.get<T>(url);
  return data;
};
