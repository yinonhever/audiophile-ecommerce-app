import styles from "./ErrorMessage.module.scss";
import { AxiosError } from "axios";

export default function ErrorMessage({ error }: { error: Error | string }) {
  const errorMsg: string =
    typeof error === "string"
      ? error
      : error instanceof AxiosError
      ? error.response?.data?.msg
      : error.message;
  return (
    <p className={styles.message}>
      {errorMsg || "An error occured. Please try again in a few moments"}
    </p>
  );
}
