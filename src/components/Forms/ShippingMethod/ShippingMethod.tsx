import { useState, FormEvent, Fragment } from "react";

import classes from "./ShippingMethod.module.css";
import RadioInput from "../Inputs/RadioInput/RadioInput";
import { shippingOptions } from "../../../utils/config";
import Hr from "../../UI/Hr";

function ShippingMethod() {
  const [checkedInput, setCheckedInput] = useState<string | null>("");

  const clickHandler = (event: FormEvent<HTMLInputElement>) => {
    setCheckedInput(event.currentTarget.getAttribute("name"));
  };

  return (
    <fieldset className={classes.fieldset}>
      <legend className={classes.fieldset__legend}>
        Choose a shipping method
      </legend>
      <Hr customClass={classes.fieldset__hr} />
      {shippingOptions.map((option) => (
        <Fragment key={option.name}>
          <RadioInput
            inputDetails={option}
            onClick={clickHandler}
            checkedInput={checkedInput}
          />
          <Hr customClass={classes.fieldset__hr} />
        </Fragment>
      ))}
    </fieldset>
  );
}

export default ShippingMethod;
