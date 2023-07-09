import { useState, useEffect } from "react";
import dropin, { Dropin } from "braintree-web-drop-in";
import styles from "./PaymentModal.module.scss";
import Modal from "../Modal";
import Spinner from "../Spinner";
import ErrorMessage from "../ErrorMessage";

export default function PaymentModal({
  active,
  onPayment,
  error
}: {
  active: boolean;
  onPayment: (nonce: string) => void;
  error?: Error | null;
}) {
  const [braintreeInstance, setBraintreeInstance] = useState<Dropin>();

  useEffect(() => {
    const initializeBraintree = async () => {
      const instance = await dropin.create({
        authorization: process.env
          .NEXT_PUBLIC_BRAINTREE_TOKENIZATION_KEY as string,
        container: "#dropin-container"
      });
      setBraintreeInstance(instance);
    };
    if (active) initializeBraintree();
  }, [active]);

  const paymentHandler = async () => {
    if (!braintreeInstance) return;
    const { nonce } = await braintreeInstance.requestPaymentMethod();
    await onPayment(nonce);
    braintreeInstance.teardown();
  };

  return (
    <Modal active={active}>
      <div className={styles.content}>
        <div id="dropin-container"></div>
        {!braintreeInstance ? (
          <Spinner colored />
        ) : (
          <button
            className={`button ${styles.button}`}
            onClick={paymentHandler}
          >
            Pay & complete order
          </button>
        )}
        {error && <ErrorMessage error={error} />}
      </div>
    </Modal>
  );
}
