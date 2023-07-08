import { useState, useEffect } from "react";
import dropin, { Dropin } from "braintree-web-drop-in";
import styles from "./PaymentModal.module.scss";
import Modal from "../Modal/Modal";
import Spinner from "../Spinner/Spinner";

export default function PaymentModal({
  active,
  onPayment,
  error
}: {
  active: boolean;
  onPayment: (nonce: string) => void;
  error?: Error | string | object | null;
}) {
  const [braintreeInstance, setBraintreeInstance] = useState<Dropin>();

  useEffect(() => {
    const initializeBraintree = async () => {
      try {
        const instance = await dropin.create({
          authorization: process.env
            .NEXT_PUBLIC_BRAINTREE_TOKENIZATION_KEY as string,
          container: "#dropin-container"
        });
        console.log("succeeded in initializing braintree", instance);
        setBraintreeInstance(instance);
      } catch (error: any) {
        console.log("failed to initialize braintree", error);
      }
    };
    if (active) {
      initializeBraintree();
    }
  }, [active]);

  const paymentHandler = async () => {
    if (!braintreeInstance) return;
    try {
      const { nonce } = await braintreeInstance.requestPaymentMethod();
      await onPayment(nonce);
      braintreeInstance.teardown();
    } catch (error: any) {
      console.log("failed to get payment method nonce", error);
    }
  };

  return (
    <Modal active={active}>
      <div className={styles.payment}>
        <div id="dropin-container"></div>
        {!braintreeInstance ? (
          <Spinner />
        ) : (
          <button
            className={`button ${styles.button}`}
            onClick={paymentHandler}
          >
            Pay & complete order
          </button>
        )}
      </div>
    </Modal>
  );
}
