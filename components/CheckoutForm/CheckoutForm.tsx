import styles from "./CheckoutForm.module.scss";
import countries from "@/lib/util/countries.json";
import type { UseFormRegister, FieldErrors } from "react-hook-form";
import type { CheckoutData } from "@/pages/checkout";

export default function CheckoutForm({
  register,
  className,
  errors
}: {
  register: UseFormRegister<CheckoutData>;
  errors: FieldErrors<CheckoutData>;
  className?: string;
}) {
  return (
    <section className={`${styles.form} ${className}`}>
      <h2 className={styles.title}>Checkout</h2>
      <div className={styles.subsection}>
        <h3 className={styles.subtitle}>Billing details</h3>
        <div className={styles.subform}>
          <div className={styles.field}>
            <label className={styles.label}>Name</label>
            <input
              {...register("billingDetails.name", { required: true })}
              type="text"
              className={`${styles.input} ${
                errors.billingDetails?.name ? styles.error : ""
              }`}
            />
          </div>
          <div className={styles.field}>
            <label className={styles.label}>Email Address</label>
            <input
              {...register("billingDetails.email", { required: true })}
              type="email"
              className={styles.input}
            />
          </div>
          <div className={styles.field}>
            <label className={styles.label}>Phone Number</label>
            <input
              {...register("billingDetails.phone", { required: true })}
              type="tel"
              className={styles.input}
            />
          </div>
        </div>
      </div>
      <div className={styles.subsection}>
        <h3 className={styles.subtitle}>Shipping info</h3>
        <div className={styles.subform}>
          <div className={`${styles.field} ${styles["field--expanded"]}`}>
            <label className={styles.label}>Address</label>
            <input
              className={styles.input}
              type="text"
              {...register("shippingDetails.address", { required: true })}
            />
          </div>
          <div className={styles.field}>
            <label className={styles.label}>ZIP Code</label>
            <input
              className={styles.input}
              type="text"
              {...register("shippingDetails.zipCode", { required: true })}
            />
          </div>
          <div className={styles.field}>
            <label className={styles.label}>City</label>
            <input
              className={styles.input}
              type="text"
              {...register("shippingDetails.city", { required: true })}
            />
          </div>
          <div className={styles.field}>
            <label className={styles.label}>Country</label>
            <select
              className={styles.input}
              {...register("shippingDetails.country", { required: true })}
            >
              {countries.map(country => (
                <option key={country.code} value={country.code}>
                  {country.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
      <div className={styles.subsection}>
        <h3 className={styles.subtitle}>Payment details</h3>
        <div className={styles.subform}>
          <div className={styles.field}>
            <label className={styles.label}>Payment Method</label>
          </div>
          <div className={styles.field}>
            <div className={styles.radioGroup}>
              <div className={styles.radioOption}>
                <input
                  {...register("paymentMethod")}
                  type="radio"
                  value="credit-card"
                  id="field-credit-card"
                />
                <label htmlFor="field-credit-card">Credit Card</label>
              </div>{" "}
              <div className={styles.radioOption}>
                <input
                  {...register("paymentMethod")}
                  type="radio"
                  value="cash"
                  id="field-cash"
                />
                <label htmlFor="field-cash">Cash</label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
