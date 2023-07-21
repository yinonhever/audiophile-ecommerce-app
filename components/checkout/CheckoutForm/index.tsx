import styles from "./CheckoutForm.module.scss";
import countries from "@/lib/assets/countries.json";
import {
  Controller,
  UseFormRegister,
  Control,
  FieldErrors,
  UseFormWatch
} from "react-hook-form";
import type { CheckoutData } from "@/lib/types";
import {
  cx,
  isValidEmail,
  isValidZipCode,
  isValidPhone
} from "@/lib/functions";
import Select from "react-dropdown-select";
import { PAYMENT_METHODS } from "@/lib/constants";
import { Fade } from "react-awesome-reveal";

export default function CheckoutForm({
  register,
  control,
  errors,
  watch
}: {
  register: UseFormRegister<CheckoutData>;
  control: Control<CheckoutData>;
  errors: FieldErrors<CheckoutData>;
  watch: UseFormWatch<CheckoutData>;
}) {
  const paymentMethod = watch("paymentMethod");

  return (
    <Fade duration={600} direction="left" triggerOnce>
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
                placeholder="alexei@mail.com"
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
                placeholder="+1 202-555-0136"
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
            <div className={cx(styles.field, styles.expanded)}>
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
                placeholder="1137 Williams Avenue"
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
                placeholder="10001"
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
                placeholder="New York"
              />
              {errors.shippingDetails?.city && (
                <small>{errors.shippingDetails.city.message}</small>
              )}
            </div>
            <div className={styles.field}>
              <label className={styles.label}>Country</label>
              <Controller
                control={control}
                name="shippingDetails.country"
                rules={{ required: "Required field" }}
                render={({ field: { value, onChange } }) => (
                  <Select
                    options={countries}
                    labelField="name"
                    valueField="name"
                    values={countries.filter(country => country.code === value)}
                    onChange={values => onChange(values[0]?.code || "")}
                    color="#d87d4a"
                    noDataLabel="No matching countries"
                    className={cx(
                      styles.input,
                      errors.shippingDetails?.country && styles.errored
                    )}
                    placeholder="United States"
                  />
                )}
              />
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
                    value={PAYMENT_METHODS.CREDIT_CARD}
                    id="field-credit-card"
                  />
                  <label
                    htmlFor="field-credit-card"
                    className={styles.radioLabel}
                  >
                    <span className={styles.radioIcon} />
                    <span>Credit Card</span>
                  </label>
                </div>{" "}
                <div className={styles.radioOption}>
                  <input
                    {...register("paymentMethod")}
                    type="radio"
                    value={PAYMENT_METHODS.CASH}
                    id="field-cash"
                  />
                  <label htmlFor="field-cash" className={styles.radioLabel}>
                    <span className={styles.radioIcon} />
                    <span>Cash on Delivery</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.note}>
            <svg
              className={styles.note__icon}
              width="48"
              height="48"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M46.594 8.438H42.28c-.448 0-.869.213-1.134.574l-2.694 3.674a1.15 1.15 0 1 1-1.848-1.37c2.568-3.53 2.864-3.545 2.864-4.285 0-.779-.636-1.406-1.407-1.406h-5.404a17.658 17.658 0 0 1 9.606-2.813h4.33a1.406 1.406 0 0 0 0-2.812h-4.33c-5.277 0-10.33 2.02-14.142 5.625h-8.34c-.777 0-1.407.63-1.407 1.406v9.938H9.844c-.777 0-1.406.63-1.406 1.406v15.6a14.053 14.053 0 0 0-7.824 3.089 1.406 1.406 0 1 0 1.772 2.185 11.226 11.226 0 0 1 7.048-2.499h3.129c.775 0 1.406.63 1.406 1.406 0 .776-.631 1.407-1.406 1.407H8.436a1.406 1.406 0 0 0 0 2.812h13.728a4.226 4.226 0 0 1-3.977 2.813H1.405a1.406 1.406 0 0 0 0 2.812h16.782c3.395 0 6.236-2.42 6.89-5.625h7.36c.776 0 1.406-.63 1.406-1.406V25.312h9.843c.777 0 1.407-.63 1.407-1.406V11.25h1.5a1.406 1.406 0 0 0 0-2.813ZM33.61 17.599a1.404 1.404 0 0 0-1.172-.63h-3.085c-1.084-1.834.241-4.172 2.381-4.172 2.531 0 3.708 3.115 1.876 4.802ZM21.188 8.437h14.06c-.744 1.03-1.057 1.305-1.352 1.983-4.216-1.779-8.726 2.057-7.559 6.549h-5.15V8.437ZM19.78 19.782h2.813v5.625H19.78v-5.625Zm11.25 19.782h-14.49c.969-2.735-1.07-5.626-3.979-5.626H11.25V19.782h5.719v7.032c0 .776.63 1.406 1.406 1.406H24c.777 0 1.406-.63 1.406-1.407v-7.03h5.625v19.78ZM33.844 22.5v-1.771a5.56 5.56 0 0 0 3.453-4.769 3.954 3.954 0 0 0 3.424-1.611l1.56-2.127V22.5h-8.437Z"
                fill="#D87D4A"
              />
            </svg>
            <p className={styles.note__text}>
              {paymentMethod === PAYMENT_METHODS.CASH ? (
                <>
                  The ‘Cash on Delivery’ option enables you to pay in cash when
                  our delivery courier arrives at your residence. Just make sure
                  your address is correct so that your order will not be
                  cancelled.
                </>
              ) : (
                paymentMethod === PAYMENT_METHODS.CREDIT_CARD && (
                  <>
                    Upon clicking ‘Continue & Pay’, you&apos;ll be prompted to
                    enter your credit card details to complete the order. Your
                    payment details are fully encrypted and protected using the
                    most advanced TLS protocol.
                  </>
                )
              )}
            </p>
          </div>
        </div>
      </section>
    </Fade>
  );
}
