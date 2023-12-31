import { useState, useEffect } from "react";
import dropin, { Dropin } from "braintree-web-drop-in";
import styles from "./PaymentModal.module.scss";
import Modal from "../../UI/Modal";
import Spinner from "../../UI/Spinner";
import Button from "../../UI/Button";
import ErrorMessage from "../../UI/ErrorMessage";

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
    <Modal active={active} adjustHeight={false}>
      <div className={styles.wrapper}>
        <div id="dropin-container" />
        {!braintreeInstance ? (
          <Spinner colored />
        ) : (
          <Button
            fullWidth
            colored
            onClick={paymentHandler}
            className={styles.button}
          >
            Pay & complete order
          </Button>
        )}
        {error && <ErrorMessage error={error} />}
      </div>
    </Modal>
  );
}
