import clsx from "clsx";

import { useAppSelector } from "@/hooks/useReduxHooks";
import classes from "@/components/OrderSummary/CostSummary/CostSummary.module.css";
import calculateOptionPrice from "@/utils/shippingForm/calculateOptionPrice";

export default function CostSummary() {
  const billingCurrency = useAppSelector(
    (state) => state.products.billingCurrency,
  );

  const totalPrice = useAppSelector((state) => state.products.totalPrice);

  const chosenShippingOption = useAppSelector(
    (state) => state.shippingAddressAndPayment.draft.shippingOption,
  );

  const chosenPaymentMethod = useAppSelector(
    (state) => state.shippingAddressAndPayment.draft.paymentMethod,
  );

  const availableShippingOptions = useAppSelector(
    (state) => state.ui.shippingOptions,
  );
  const availablePaymentOptions = useAppSelector(
    (state) => state.ui.paymentOptions,
  );

  const shippingPrice = calculateOptionPrice(
    availableShippingOptions,
    chosenShippingOption,
    billingCurrency,
  );
  const isShippingPriceSet = Boolean(chosenShippingOption);
  const paymentPrice = calculateOptionPrice(
    availablePaymentOptions,
    chosenPaymentMethod,
    billingCurrency,
  );
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
          className={clsx(
            classes["cost-summary__label"],
            classes["cost-summary__label--bold"],
          )}
        >
          Order Total:
        </p>
        {isShippingPriceSet && (
          <p
            className={clsx(
              classes["cost-summary__label"],
              classes["cost-summary__label--bold"],
            )}
          >
            Shipping:
          </p>
        )}

        {!!paymentPrice && (
          <p
            className={clsx(
              classes["cost-summary__label"],
              classes["cost-summary__label--bold"],
            )}
          >
            Other:
          </p>
        )}
        <p className={classes["cost-summary__label"]}>Total: </p>
      </div>
      <div className={classes["cost-summary__values"]}>
        <p className={classes.values__item}>
          {billingCurrency.symbol}
          {(totalPrice * 0.21).toFixed(2)}
        </p>

        <p className={classes.values__item}>
          {billingCurrency.symbol}
          {totalPrice.toFixed(2)}
        </p>
        {isShippingPriceSet && (
          <p className={classes.values__item}>
            {billingCurrency.symbol}
            {shippingPrice.toFixed(2)}
          </p>
        )}
        {!!paymentPrice && (
          <p className={classes.values__item}>
            {billingCurrency.symbol}
            {paymentPrice.toFixed(2)}
          </p>
        )}
        <p className={classes.values__item}>
          {billingCurrency.symbol}
          {totalPriceAndOtherCosts}
        </p>
      </div>
    </div>
  );
}
