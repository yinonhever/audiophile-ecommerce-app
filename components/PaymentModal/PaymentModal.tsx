import { useState, useEffect } from "react";
import dropin, { Dropin } from "braintree-web-drop-in";
import styles from "./PaymentModal.module.scss";

export default function PaymentModal({
  active,
  onPayment
}: {
  active: boolean;
  onPayment: (nonce: string) => void;
}) {
  const [braintreeInstance, setBraintreeInstance] = useState<Dropin>();
  const [error, setError] = useState<Error | string | object | null>();

  useEffect(() => {
    const initializeBraintree = async () => {
      console.log("attempting to initialize braintree");
      setError(null);
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
        setError(error);
      }
    };
    if (active) {
      initializeBraintree();
    }
  }, [active]);

  const paymentHandler = async () => {
    if (!braintreeInstance) return;
    setError(null);
    try {
      const { nonce } = await braintreeInstance.requestPaymentMethod();
      console.log("nonce", nonce);
      await onPayment(nonce);
      braintreeInstance.teardown();
    } catch (error: any) {
      console.log("failed to get payment method nonce", error);
      setError(error);
    }
  };

  return (
    <div className={styles.payment}>
      <div id="dropin-container"></div>
      {braintreeInstance && <button onClick={paymentHandler}>Pay</button>}
    </div>
  );
}
