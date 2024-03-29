/* eslint-disable jsx-a11y/label-has-associated-control */
import { useEffect, useRef, FormEvent } from "react";
import { Markup } from "interweave";

import { RadioInputProps } from "../../../../models/utility-models";
import {
  useAppSelector,
  useAppDispatch,
} from "../../../../hooks/useReduxHooks";
import { shippingPaymentOptionsActions } from "../../../../store/shippingPaymentOptions";
import classes from "./RadioInput.module.css";

function RadioInput({
  inputDetails,
  clicked,
  checkedInputName,
  fieldsetId,
}: {
  inputDetails: RadioInputProps;
  clicked: (event: FormEvent<HTMLInputElement>, optionCost: number) => void;
  checkedInputName: string | null;
  fieldsetId: string;
}) {
  const { label, name, costs } = inputDetails;
  const { billingCurrency } = useAppSelector((state) => state.products);
  const inputRef = useRef<HTMLInputElement>(null);
  const dispatch = useAppDispatch();
  const { updatePriceOfAnOption } = shippingPaymentOptionsActions;
  const checkKickClasses =
    name === checkedInputName
      ? [classes.checkmark__kick, classes["checkmark__kick--checked"]]
      : [classes.checkmark__kick];
  const checkStemClasses =
    name === checkedInputName
      ? [classes.checkmark__stem, classes["checkmark__stem--checked"]]
      : [classes.checkmark__stem];

  const optionPrice = costs.find(
    (cost) => cost.currency.symbol === billingCurrency,
  )!.amount;

  const updatedLabel = `${label}<b> - ${
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
        <span className={classes.checkmark}>
          <div className={checkKickClasses.join(" ")} />
          <div className={checkStemClasses.join(" ")} />
        </span>
        <input
          type="radio"
          name={name}
          value={name}
          className={classes["form-control__input"]}
          id={name}
          onChange={onChangeHandler}
          checked={name === checkedInputName}
          ref={inputRef}
        />
        <Markup content={updatedLabel} />
      </label>
    </div>
  );
}

export default RadioInput;
