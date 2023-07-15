import { useEffect, useState, FormEvent, Fragment } from "react";

import classes from "./Fieldset.module.css";
import RadioInput from "../Inputs/RadioInput/RadioInput";
import { RadioInputProps } from "../../../models/ui-and-hooks";
import Hr from "../../UI/Hr";
import { shippingPaymentOptionsActions } from "../../../store/shippingPaymentOptions";
import { useAppDispatch } from "../../../hooks/useReduxHooks";

function Fieldset({
  options,
  heading,
  identifier,
}: {
  options: RadioInputProps[];
  heading: string;
  identifier: string;
}) {
  const [checkedInput, setCheckedInput] = useState<string | null>("");
  const { registerOption, optionChangeHandler } = shippingPaymentOptionsActions;
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(registerOption(identifier));
  }, [dispatch, identifier, registerOption]);

  const clickHandler = (
    event: FormEvent<HTMLInputElement>,
    optionCost: number,
  ) => {
    setCheckedInput(event.currentTarget.getAttribute("name"));

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
            checkedInput={checkedInput}
            fieldsetId={identifier}
          />
          <Hr customClass={classes.fieldset__hr} />
        </Fragment>
      ))}
    </fieldset>
  );
}

export default Fieldset;
