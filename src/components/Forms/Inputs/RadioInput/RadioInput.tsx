/* eslint-disable jsx-a11y/label-has-associated-control */
import { useEffect, useRef, FormEvent } from "react";
import { Markup } from "interweave";
import { useAppSelector } from "../../../../hooks/useReduxHooks";

import classes from "./RadioInput.module.css";
import { RadioInputProps } from "../../../../models/ui-and-hooks";

function RadioInput({
  inputDetails,
  clicked,
  checkedInput,
}: {
  inputDetails: RadioInputProps;
  clicked: (event: FormEvent<HTMLInputElement>, optionCost: number) => void;
  checkedInput: string | null;
}) {
  const { label, name, costs } = inputDetails;
  const { billingCurrency } = useAppSelector((state) => state.products);
  const inputRef = useRef<HTMLInputElement>(null);

  const optionPrice = costs.find(
    (cost) => cost.currency.symbol === billingCurrency,
  )!.amount;

  const updatedLabel = `${label}<b>${
    billingCurrency + optionPrice.toFixed(2)
  }</b>`;

  const onChangeHandler = (event: FormEvent<HTMLInputElement>) => {
    clicked(event, optionPrice);
  };

  useEffect(() => {
    if (inputRef.current!.checked) {
      console.log(
        "[hook-radio] :",
        inputRef.current!.getAttribute("name"),
        optionPrice,
      );
    }
  }, [billingCurrency, optionPrice]);

  return (
    <div className={classes["form-control"]}>
      <label htmlFor={name} className={classes["form-control__label"]}>
        <input
          type="radio"
          name={name}
          value={name}
          className={classes["form-control__input"]}
          id={name}
          onChange={onChangeHandler}
          checked={name === checkedInput}
          ref={inputRef}
        />
        <Markup content={updatedLabel} />
      </label>
    </div>
  );
}

export default RadioInput;
