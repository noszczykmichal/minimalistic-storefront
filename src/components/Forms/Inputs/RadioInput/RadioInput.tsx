/* eslint-disable jsx-a11y/label-has-associated-control */
import { useEffect, useRef, FormEvent } from "react";
import { Markup } from "interweave";

import classes from "./RadioInput.module.css";
import { RadioInputProps } from "../../../../models/ui-and-hooks";
import {
  useAppSelector,
  useAppDispatch,
} from "../../../../hooks/useReduxHooks";
import { shippingPaymentOptionsActions } from "../../../../store/shippingPaymentOptions";

function RadioInput({
  inputDetails,
  clicked,
  checkedInput,
  fieldsetId,
}: {
  inputDetails: RadioInputProps;
  clicked: (event: FormEvent<HTMLInputElement>, optionCost: number) => void;
  checkedInput: string | null;
  fieldsetId: string;
}) {
  const { label, name, costs } = inputDetails;
  const { billingCurrency } = useAppSelector((state) => state.products);
  const inputRef = useRef<HTMLInputElement>(null);
  const dispatch = useAppDispatch();
  const { updatePriceOfAnOption } = shippingPaymentOptionsActions;

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
      dispatch(updatePriceOfAnOption({ fieldsetId, optionPrice }));
    }
  }, [
    billingCurrency,
    optionPrice,
    updatePriceOfAnOption,
    dispatch,
    fieldsetId,
  ]);

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
