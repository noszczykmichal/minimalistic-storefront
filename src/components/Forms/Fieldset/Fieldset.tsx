import { useState, FormEvent, Fragment } from "react";

import classes from "./Fieldset.module.css";
import RadioInput from "../Inputs/RadioInput/RadioInput";
import { RadioInputProps } from "../../../models/ui-and-hooks";
import Hr from "../../UI/Hr";

function Fieldset({
  options,
  heading,
}: {
  options: RadioInputProps[];
  heading: string;
}) {
  const [checkedInput, setCheckedInput] = useState<string | null>("");

  const clickHandler = (event: FormEvent<HTMLInputElement>) => {
    setCheckedInput(event.currentTarget.getAttribute("name"));
  };

  return (
    <fieldset className={classes.fieldset}>
      <legend className={classes.fieldset__legend}>{heading}</legend>
      <Hr customClass={classes.fieldset__hr} />
      {options.map((option) => (
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

export default Fieldset;
