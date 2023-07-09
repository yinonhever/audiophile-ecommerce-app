import styles from "./CheckoutForm.module.scss";
import countries from "@/lib/util/countries.json";
import type { UseFormRegister, FieldErrors } from "react-hook-form";
import type { CheckoutData } from "@/pages/checkout";
import type { PropsWithClassName } from "@/lib/types";
import { isValidEmail, isValidZipCode, isValidPhone } from "@/lib/functions";

export default function CheckoutForm({
  register,
  className,
  errors
}: PropsWithClassName<{
  register: UseFormRegister<CheckoutData>;
  errors: FieldErrors<CheckoutData>;
}>) {
  return (
    <section className={`${styles.form} ${className}`}>
      <h2 className={styles.title}>Checkout</h2>
      <div className={styles.subsection}>
        <h3 className={styles.subtitle}>Billing details</h3>
        <div className={styles.subform}>
          <div className={styles.field}>
            <label className={styles.label}>Name</label>
            <input
              {...register("billingDetails.name", {
                required: "This field is required"
              })}
              type="text"
              className={`${styles.input} ${
                errors.billingDetails?.name ? styles.errored : ""
              }`}
            />
            {errors.billingDetails?.name && (
              <small>{errors.billingDetails.name.message}</small>
            )}
          </div>
          <div className={styles.field}>
            <label className={styles.label}>Email Address</label>
            <input
              {...register("billingDetails.email", {
                required: "This field is required",
                validate: value =>
                  isValidEmail(value) || "Please enter a valid email address"
              })}
              type="email"
              className={`${styles.input} ${
                errors.billingDetails?.email ? styles.errored : ""
              }`}
            />
            {errors.billingDetails?.email && (
              <small>{errors.billingDetails.email.message}</small>
            )}
          </div>
          <div className={styles.field}>
            <label className={styles.label}>Phone Number</label>
            <input
              {...register("billingDetails.phone", {
                required: "This field is required",
                validate: value =>
                  isValidPhone(value) || "Please enter a valid phone number"
              })}
              type="tel"
              className={`${styles.input} ${
                errors.billingDetails?.phone ? styles.errored : ""
              }`}
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
              className={`${styles.input} ${
                errors.shippingDetails?.address ? styles.errored : ""
              }`}
              type="text"
              {...register("shippingDetails.address", {
                required: "This field is required"
              })}
            />
            {errors.shippingDetails?.address && (
              <small>{errors.shippingDetails.address.message}</small>
            )}
          </div>
          <div className={styles.field}>
            <label className={styles.label}>ZIP Code</label>
            <input
              className={`${styles.input} ${
                errors.shippingDetails?.zipCode ? styles.errored : ""
              }`}
              type="text"
              {...register("shippingDetails.zipCode", {
                required: "This field is required",
                validate: value =>
                  isValidZipCode(value) || "Please enter a valid ZIP code"
              })}
            />
            {errors.shippingDetails?.zipCode && (
              <small>{errors.shippingDetails.zipCode.message}</small>
            )}
          </div>
          <div className={styles.field}>
            <label className={styles.label}>City</label>
            <input
              className={`${styles.input} ${
                errors.shippingDetails?.city ? styles.errored : ""
              }`}
              type="text"
              {...register("shippingDetails.city", {
                required: "This field is required"
              })}
            />
            {errors.shippingDetails?.city && (
              <small>{errors.shippingDetails.city.message}</small>
            )}
          </div>
          <div className={styles.field}>
            <label className={styles.label}>Country</label>
            <select
              className={`${styles.input} ${
                errors.shippingDetails?.country ? styles.errored : ""
              }`}
              {...register("shippingDetails.country", {
                required: "This field is required"
              })}
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
