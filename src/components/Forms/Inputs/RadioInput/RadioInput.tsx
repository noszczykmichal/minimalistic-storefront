import { Markup } from "interweave";
import { UseFormRegisterReturn } from "react-hook-form";

import { useAppSelector } from "@/hooks/useReduxHooks";
import type { Cost, FieldOption } from "@/types/types";
import classes from "@/components/Forms/Inputs/RadioInput/RadioInput.module.css";

export default function RadioInput<T extends string>({
  inputDetails,
  registration,
}: {
  inputDetails: FieldOption<T>;
  registration: UseFormRegisterReturn;
}) {
  const { label, name, costs } = inputDetails;
  const billingCurrency = useAppSelector(
    (state) => state.products.billingCurrency,
  );

  const optionPrice =
    costs.find((cost: Cost) => cost.currency.symbol === billingCurrency.symbol)
      ?.amount ?? 0;
  const updatedLabel = `${label}<b> - ${
    billingCurrency.symbol + optionPrice.toFixed(2)
  }</b>`;

  const id = `${registration.name}-${name}`;

  return (
    <div className={classes["form-control"]}>
      <label htmlFor={id} className={classes["form-control__label"]}>
        <input
          type="radio"
          value={name}
          className={classes["form-control__input"]}
          id={id}
          {...registration}
        />
        <span className={classes.checkmark} aria-hidden="true">
          <span className={classes.checkmark__kick} />
          <span className={classes.checkmark__stem} />
        </span>
        <Markup content={updatedLabel} className={classes.markup} />
      </label>
    </div>
  );
}
