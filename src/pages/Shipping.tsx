import { FormEvent } from "react";

import classes from "./Shipping.module.css";
import { useAppSelector } from "../hooks/useReduxHooks";
import OrderSummaryItem from "../components/OrderSummary/OrderSummaryItem/OrderSummaryItem";
import Hr from "../components/UI/Hr";
import Button from "../components/UI/Button";

function Shipping() {
  const { cart, billingCurrency, totalPrice, productsTotal } = useAppSelector(
    (state) => state.products,
  );

  const onProceedToBilling = (event: FormEvent) => {
    event.preventDefault();
    console.log("hey");
  };

  return (
    <section className={classes.section}>
      <div className={classes["shipping-form__wrapper"]}>
        <h1>Shipping</h1>
        <p>Type in the shipping address</p>
        <form className={classes.form}>
          <div className={classes["form-control"]}>
            <label htmlFor="fName">
              First Name:
              <input type="text" name="fName" />
            </label>
          </div>
          <div className={classes["form-control"]}>
            <label htmlFor="lName">
              Last Name:
              <input type="text" name="lName" />
            </label>
          </div>
          <div className={classes["form-control"]}>
            <label htmlFor="address_1">
              Address Line 1:
              <input type="text" name="address_1" />
            </label>
          </div>
          <div className={classes["form-control"]}>
            <label htmlFor="address_2">
              Address Line 2:
              <input type="text" name="address_2" />
            </label>
          </div>
          <div className={classes["form-control"]}>
            <label htmlFor="city">
              City:
              <input type="text" name="city" />
            </label>
          </div>
          <div className={classes["form-control"]}>
            <label htmlFor="postal_code">
              Postal Code:
              <input type="text" name="postal_code" />
            </label>
          </div>
          <div className={classes["form-control"]}>
            <label htmlFor="country">
              Country:
              <input type="text" name="country" />
            </label>
          </div>
          <div className={classes["form-control"]}>
            <label htmlFor="phone">
              Phone:
              <input type="tel" name="phone" />
            </label>
          </div>
          <div className={classes["form-control"]}>
            <label htmlFor="email">
              E-mail:
              <input type="email" name="email" />
            </label>
          </div>
          <Button
            customClass={classes.form__button}
            clicked={onProceedToBilling}
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
