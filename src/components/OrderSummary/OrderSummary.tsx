import classes from "./OrderSummary.module.css";
import { useAppSelector } from "../../hooks/useReduxHooks";
import OrderSummaryItem from "./OrderSummaryItem/OrderSummaryItem";
import Hr from "../UI/Hr";

function OrderSummary() {
  const { cart, billingCurrency, totalPrice } = useAppSelector(
    (state) => state.products,
  );

  const { shippingOption, paymentOption } = useAppSelector(
    (state) => state.shippingPaymentOptions.inputs,
  );

  const isShippingPriceSet = shippingOption ? shippingOption.isSelected : false;
  const shippingPrice = shippingOption ? shippingOption.cost : 0;
  const paymentPrice = paymentOption ? paymentOption.cost : 0;
  const totalPriceAndOtherCosts = totalPrice + shippingPrice + paymentPrice;

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

          <p
            className={[
              classes["summary-wrapper__label"],
              classes["summary-wrapper__label--bold"],
            ].join(" ")}
          >
            Order Total:
          </p>
          {isShippingPriceSet && (
            <p
              className={[
                classes["summary-wrapper__label"],
                classes["summary-wrapper__label--bold"],
              ].join(" ")}
            >
              Shipping:
            </p>
          )}
          {!!paymentPrice && (
            <p
              className={[
                classes["summary-wrapper__label"],
                classes["summary-wrapper__label--bold"],
              ].join(" ")}
            >
              Other:
            </p>
          )}
          <p className={classes["summary-wrapper__label"]}>Total: </p>
        </div>
        <div className={classes["summary-wrapper__values"]}>
          <p className={classes.values__item}>
            {billingCurrency}
            {(totalPrice * 0.21).toFixed(2)}
          </p>

          <p className={classes.values__item}>
            {billingCurrency}
            {totalPrice.toFixed(2)}
          </p>
          {isShippingPriceSet && (
            <p className={classes.values__item}>
              {billingCurrency}
              {shippingPrice}
            </p>
          )}
          {!!paymentPrice && (
            <p className={classes.values__item}>
              {billingCurrency}
              {paymentPrice}
            </p>
          )}
          <p className={classes.values__item}>
            {billingCurrency}
            {totalPriceAndOtherCosts}
          </p>
        </div>
      </div>
    </div>
  );
}

export default OrderSummary;
