import { useAppSelector } from "@/hooks/useReduxHooks";
import { shippingOptions, paymentOptions } from "@/utils/form/constants";
import classes from "@/components/OrderSummary/CostSummary/CostSummary.module.css";
import { Option } from "@/types/types";

const calculateOptionPrice = <T extends string>(
  optionsArray: Option<T>[],
  selectedOption: string | null | undefined,
  currency: string,
) => {
  if (!selectedOption) {
    return 0;
  }
  const chosenOption = optionsArray.find(
    (option) => option.name === selectedOption,
  )?.costs;

  const optionPrice = chosenOption?.find(
    (price) => price.currency.symbol === currency,
  );

  return optionPrice?.amount ?? 0;
};

export default function CostSummary() {
  const { billingCurrency, totalPrice } = useAppSelector(
    (state) => state.products,
  );

  const { shippingOption, paymentMethod } = useAppSelector(
    (state) => state.shippingAddressAndPayment.draft,
  );

  const shippingPrice = calculateOptionPrice(
    shippingOptions,
    shippingOption,
    billingCurrency,
  );
  const isShippingPriceSet = shippingOption !== "" || shippingPrice !== 0;
  const paymentPrice = calculateOptionPrice(
    paymentOptions,
    paymentMethod,
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
            {paymentPrice.toFixed(2)}
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
