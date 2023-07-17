import styles from "./CheckoutForm.module.scss";
import countries from "@/lib/util/countries.json";
import type { UseFormRegister, FieldErrors } from "react-hook-form";
import type { CheckoutData } from "@/lib/types";
import {
  cx,
  isValidEmail,
  isValidZipCode,
  isValidPhone
} from "@/lib/functions";

export default function CheckoutForm({
  register,
  errors
}: {
  register: UseFormRegister<CheckoutData>;
  errors: FieldErrors<CheckoutData>;
}) {
  return (
    <section className={styles.wrapper}>
      <h2 className={styles.title}>Checkout</h2>
      <div className={styles.subsection}>
        <h3 className={styles.subtitle}>Billing details</h3>
        <div className={styles.subform}>
          <div className={styles.field}>
            <label className={styles.label}>Name</label>
            <input
              {...register("billingDetails.name", {
                required: "Required field"
              })}
              type="text"
              className={cx(
                styles.input,
                errors.billingDetails?.name && styles.errored
              )}
              placeholder="Alexei Ward"
            />
            {errors.billingDetails?.name && (
              <small>{errors.billingDetails.name.message}</small>
            )}
          </div>
          <div className={styles.field}>
            <label className={styles.label}>Email Address</label>
            <input
              {...register("billingDetails.email", {
                required: "Required field",
                validate: value => isValidEmail(value) || "Invalid email"
              })}
              type="email"
              className={cx(
                styles.input,
                errors.billingDetails?.email && styles.errored
              )}
            />
            {errors.billingDetails?.email && (
              <small>{errors.billingDetails.email.message}</small>
            )}
          </div>
          <div className={styles.field}>
            <label className={styles.label}>Phone Number</label>
            <input
              {...register("billingDetails.phone", {
                required: "Required field",
                validate: value => isValidPhone(value) || "Invalid number"
              })}
              type="tel"
              className={cx(
                styles.input,
                errors.billingDetails?.phone && styles.errored
              )}
            />
            {errors.billingDetails?.phone && (
              <small>{errors.billingDetails.phone.message}</small>
            )}
          </div>
        </div>
      </div>
      <div className={styles.subsection}>
        <h3 className={styles.subtitle}>Shipping info</h3>
        <div className={styles.subform}>
          <div className={`${styles.field} ${styles["field--expanded"]}`}>
            <label className={styles.label}>Address</label>
            <input
              {...register("shippingDetails.address", {
                required: "Required field"
              })}
              type="text"
              className={cx(
                styles.input,
                errors.shippingDetails?.address && styles.errored
              )}
            />
            {errors.shippingDetails?.address && (
              <small>{errors.shippingDetails.address.message}</small>
            )}
          </div>
          <div className={styles.field}>
            <label className={styles.label}>ZIP Code</label>
            <input
              {...register("shippingDetails.zipCode", {
                required: "Required field",
                validate: value => isValidZipCode(value) || "Invalid code"
              })}
              type="text"
              className={cx(
                styles.input,
                errors.shippingDetails?.zipCode && styles.errored
              )}
            />
            {errors.shippingDetails?.zipCode && (
              <small>{errors.shippingDetails.zipCode.message}</small>
            )}
          </div>
          <div className={styles.field}>
            <label className={styles.label}>City</label>
            <input
              {...register("shippingDetails.city", {
                required: "Required field"
              })}
              type="text"
              className={cx(
                styles.input,
                errors.shippingDetails?.city && styles.errored
              )}
            />
            {errors.shippingDetails?.city && (
              <small>{errors.shippingDetails.city.message}</small>
            )}
          </div>
          <div className={styles.field}>
            <label className={styles.label}>Country</label>
            <select
              {...register("shippingDetails.country", {
                required: "Required field"
              })}
              className={cx(
                styles.input,
                errors.shippingDetails?.country && styles.errored
              )}
            >
              {countries.map(country => (
                <option key={country.code} value={country.code}>
                  {country.name}
                </option>
              ))}
            </select>
            {errors.shippingDetails?.country && (
              <small>{errors.shippingDetails.country.message}</small>
            )}
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
