import { useNavigate } from "react-router";

import classes from "./ShippingAndPayment.module.css";
import { shippingOptions, paymentOptions } from "../utils/config";
import Fieldset from "../components/Forms/Fieldset/Fieldset";
import OrderSummary from "../components/OrderSummary/OrderSummary";
import Button from "../components/UI/Button";

function ShippingAndPayment() {
  const navigate = useNavigate();

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
          <div className={classes["actions-wrapper"]}>
            <Button
              customClass={classes.form__button}
              clicked={() => navigate(-1)}
            >
              Back
            </Button>
            <Button customClass={classes.form__button}>Next</Button>
          </div>
        </form>
      </div>

      <OrderSummary />
    </section>
  );
}

export default ShippingAndPayment;
