/* eslint-disable jsx-a11y/label-has-associated-control */
import { FormEvent } from "react";
import { Markup } from "interweave";
import { useAppSelector } from "../../../../hooks/useReduxHooks";

import classes from "./RadioInput.module.css";
import { RadioInputProps } from "../../../../models/ui-and-hooks";

function RadioInput({
  inputDetails,
  onClick,
  checkedInput,
}: {
  inputDetails: RadioInputProps;
  onClick: (event: FormEvent<HTMLInputElement>) => void;
  checkedInput: string | null;
}) {
  const { label, name, costs } = inputDetails;
  const { billingCurrency } = useAppSelector((state) => state.products);

  const shippingPrice = costs.find(
    (cost) => cost.currency.symbol === billingCurrency,
  )!.amount;

  const updatedLabel = `${label}<b>${
    billingCurrency + shippingPrice.toFixed(2)
  }</b>`;

  return (
    <div className={classes["form-control"]}>
      <label htmlFor={name} className={classes["form-control__label"]}>
        <input
          type="radio"
          name={name}
          value={name}
          className={classes["form-control__input"]}
          id={name}
          onChange={onClick}
          checked={name === checkedInput}
        />
        <Markup content={updatedLabel} />
      </label>
    </div>
  );
}

export default RadioInput;
