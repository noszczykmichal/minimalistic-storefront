import classes from "./CostSummary.module.css";
import { useAppSelector } from "../../../hooks/useReduxHooks";

function CostSummary() {
  const { billingCurrency, totalPrice } = useAppSelector(
    (state) => state.products,
  );

  const { shippingOption, paymentOption } = useAppSelector(
    (state) => state.shippingPaymentOptions.inputs,
  );

  const isShippingPriceSet = shippingOption ? shippingOption.isSelected : false;
  const shippingPrice = shippingOption ? shippingOption.cost : 0;
  const paymentPrice = paymentOption ? paymentOption.cost : 0;
  const totalPriceAndOtherCosts = (
    totalPrice +
    shippingPrice +
    paymentPrice
  ).toFixed(2);
  return (
    <div className={classes["cost-summary"]}>
      <div className={classes["cost-summary__labels"]}>
        <p className={classes["cost-summary__label"]}>Tax 21%: </p>

        <p
          className={[
            classes["cost-summary__label"],
            classes["cost-summary__label--bold"],
          ].join(" ")}
        >
          Order Total:
        </p>
        {isShippingPriceSet && (
          <p
            className={[
              classes["cost-summary__label"],
              classes["cost-summary__label--bold"],
            ].join(" ")}
          >
            Shipping:
          </p>
        )}
        {!!paymentPrice && (
          <p
            className={[
              classes["cost-summary__label"],
              classes["cost-summary__label--bold"],
            ].join(" ")}
          >
            Other:
          </p>
        )}
        <p className={classes["cost-summary__label"]}>Total: </p>
      </div>
      <div className={classes["cost-summary__values"]}>
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
            {shippingPrice.toFixed(2)}
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
  );
}

export default CostSummary;
