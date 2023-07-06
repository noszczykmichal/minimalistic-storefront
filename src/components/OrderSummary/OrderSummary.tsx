import classes from "./OrderSummary.module.css";
import { useAppSelector } from "../../hooks/useReduxHooks";
import OrderSummaryItem from "./OrderSummaryItem/OrderSummaryItem";
import Hr from "../UI/Hr";

function OrderSummary() {
  const { cart, billingCurrency, totalPrice, productsTotal } = useAppSelector(
    (state) => state.products,
  );
  return (
    <div className={classes["order-summary"]}>
      <p className={classes["order-summary__heading"]}>Order Summary</p>
      <ul className={classes["order-summary__cart-items"]}>
        {cart.map((item) => (
          <OrderSummaryItem key={item.internalID} cartItem={item} />
        ))}
      </ul>
      <Hr customClass={classes["order-summary__hr"]} />
      <div className={classes["order-summary__summary-wrapper"]}>
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
  );
}

export default OrderSummary;
