import { useEffect, useState, FormEvent, Fragment } from "react";

import RadioInput from "@/components/Forms/Inputs/RadioInput/RadioInput";
import { RadioInputProps } from "@/models/utility-models";
import Hr from "@/components/UI/Hr/Hr";
import { shippingPaymentOptionsActions } from "@/store/shippingPaymentOptions";
import { useAppDispatch, useAppSelector } from "@/hooks/useReduxHooks";
import classes from "@/components/Forms/Fieldset/Fieldset.module.css";

export default function Fieldset({
  options,
  heading,
  identifier,
}: {
  options: RadioInputProps[];
  heading: string;
  identifier: string;
}) {
  const [checkedInputName, setCheckedInputName] = useState<string | null>("");
  const { registerOption, optionChangeHandler } = shippingPaymentOptionsActions;
  const dispatch = useAppDispatch();
  const value = useAppSelector((state) =>
    state.shippingPaymentOptions.inputs[identifier]
      ? state.shippingPaymentOptions.inputs[identifier].value
      : "",
  );

  useEffect(() => {
    dispatch(registerOption(identifier));
    if (value) {
      setCheckedInputName(value);
    }
  }, [dispatch, identifier, registerOption, value]);

  const clickHandler = (
    event: FormEvent<HTMLInputElement>,
    optionCost: number,
  ) => {
    setCheckedInputName(event.currentTarget.getAttribute("name"));

    dispatch(
      optionChangeHandler({
        identifier,
        name: event.currentTarget.getAttribute("name"),
        optionCost,
      }),
    );
  };

  return (
    <fieldset className={classes.fieldset}>
      <legend className={classes.fieldset__legend}>{heading}</legend>
      <Hr customClass={classes.fieldset__hr} />
      {options.map((option) => (
        <Fragment key={option.name}>
          <RadioInput
            inputDetails={option}
            clicked={clickHandler}
            checkedInputName={checkedInputName}
            fieldsetId={identifier}
          />
          <Hr customClass={classes.fieldset__hr} />
        </Fragment>
      ))}
    </fieldset>
  );
}
