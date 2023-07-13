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
    // console.log(event.currentTarget.getAttribute("name"));
    // console.log(optionCost);
    dispatch(
      optionChangeHandler({
        identifier,
        name: event.currentTarget.getAttribute("name"),
        optionCost,
      }),
    );

    // ta sama metoda co tu będzie rejestrowała że został kliknięty
    // musi się odpalać w radio w useEffect żeby wysłać aktualną cenę
  };

  // const shipping_and_payment = {
  //   selected_shipping: "carrier",
  //   cost: 5.0,
  //   isSelected: true,
  // };

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
          />
          <Hr customClass={classes.fieldset__hr} />
        </Fragment>
      ))}
    </fieldset>
  );
}

export default Fieldset;
