import { useState, useEffect } from "react";
import dropin, { Dropin } from "braintree-web-drop-in";
import styles from "./PaymentModal.module.scss";
import Modal from "../Modal";
import Spinner from "../Spinner";
import Button from "../Button";
import ErrorMessage from "../ErrorMessage";

export default function PaymentModal({
  active,
  onPayment,
  error
}: {
  active: boolean;
  onPayment: (arg0: string) => void;
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
      <div className={styles.wrapper}>
        <div id="dropin-container" className={styles.dropin} />
        {!braintreeInstance ? (
          <Spinner colored />
        ) : (
          <Button fullWidth colored onClick={paymentHandler}>
            Pay & complete order
          </Button>
        )}
        {error && <ErrorMessage error={error} />}
      </div>
    </Modal>
  );
}
