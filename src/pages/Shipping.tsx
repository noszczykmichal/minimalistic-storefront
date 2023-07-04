import { FormEvent } from "react";

import classes from "./Shipping.module.css";
import { useAppSelector } from "../hooks/useReduxHooks";
import OrderSummaryItem from "../components/OrderSummary/OrderSummaryItem/OrderSummaryItem";
import Hr from "../components/UI/Hr";
import Button from "../components/UI/Button";
import formInputs from "../utils/config";
import Input from "../components/Input/Input";

function Shipping() {
  const { cart, billingCurrency, totalPrice, productsTotal } = useAppSelector(
    (state) => state.products,
  );

  const { isFormValid } = useAppSelector((state) => state.form);

  const onProceedToBilling = (event: FormEvent) => {
    event.preventDefault();
    // if (isFNameValid) {
    //   console.log(enteredFirstName);
    //   fNameResetHandler();
    // }

    console.log("hey");
  };

  return (
    <section className={classes.section}>
      <div className={classes["shipping-form__wrapper"]}>
        <h1>Shipping</h1>
        <p>Type in the shipping address</p>
        <form className={classes.form}>
          {formInputs.map((input) => (
            <Input key={input.name} inputDetails={input} />
          ))}
          <Button
            customClass={classes.form__button}
            clicked={onProceedToBilling}
            isDisabled={!isFormValid}
          >
            PROCEED TO BILLING
          </Button>
        </form>
      </div>

      <div className={classes["order-summary"]}>
        <p className={classes["order-summary__heading"]}>Order Summary</p>
        <ul className={classes["cart-items"]}>
          {cart.map((item) => (
            <OrderSummaryItem key={item.internalID} cartItem={item} />
          ))}
        </ul>
        <Hr />
        <div className={classes.summary}>
          <div className={classes["summary-wrapper__labels"]}>
            <p className={classes["summary-wrapper__label"]}>Tax 21%: </p>
            <p className={classes["summary-wrapper__label"]}>Quantity: </p>
            <p
              className={[
                classes["summary-wrapper__label"],
                classes["summary-wrapper__label--bold"],
              ].join(" ")}
            >
              Total:
            </p>
          </div>
          <div className={classes["summary-wrapper__values"]}>
            <p className={classes.values__item}>
              {billingCurrency}
              {(totalPrice * 0.21).toFixed(2)}
            </p>
            <p className={classes.values__item}>{productsTotal}</p>
            <p className={classes.values__item}>
              {billingCurrency}
              {totalPrice.toFixed(2)}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Shipping;
