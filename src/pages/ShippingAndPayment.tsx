import classes from "./ShippingAndPayment.module.css";
import { shippingOptions, paymentOptions } from "../utils/config";
import Fieldset from "../components/Forms/Fieldset/Fieldset";
import OrderSummary from "../components/OrderSummary/OrderSummary";
import { useAppSelector } from "../hooks/useReduxHooks";
import ActionButtons from "../components/Forms/ActionButtons/ActionButtons";

function ShippingAndPayment() {
  const { isFormValid } = useAppSelector(
    (state) => state.shippingPaymentOptions,
  );

  return (
    <section className={classes.section}>
      <div className={classes["form-wrapper"]}>
        <h1>Shipping and Payment</h1>
        <form className={classes.form}>
          <Fieldset
            options={shippingOptions}
            heading="Choose a shipping method"
            identifier="shippingOption"
          />
          <Fieldset
            options={paymentOptions}
            heading="Choose a payment method"
            identifier="paymentOption"
          />
          <ActionButtons
            isNextBttnDisabled={!isFormValid}
            nextBttnPath="/cart/review"
          />
        </form>
      </div>

      <OrderSummary />
    </section>
  );
}

export default ShippingAndPayment;
