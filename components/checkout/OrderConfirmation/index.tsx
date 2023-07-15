import { OrderData } from "@/models/Order";
import styles from "./OrderConfirmation.module.scss";
import Modal from "@/components/UI/Modal";

export default function OrderConfirmation({
  orderData,
  active
}: {
  orderData?: OrderData;
  active: boolean;
}) {
  return <Modal active={active}></Modal>;
}
