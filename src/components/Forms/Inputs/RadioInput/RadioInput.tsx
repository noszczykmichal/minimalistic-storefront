/* eslint-disable jsx-a11y/label-has-associated-control */
import { FormEvent } from "react";
import { Markup } from "interweave";

import classes from "./RadioInput.module.css";

interface RadioInputProps {
  label: string;
  name: string;
  // id: string;
}

function RadioInput({
  inputDetails,
  onClick,
  checkedInput,
}: {
  inputDetails: RadioInputProps;
  onClick: (event: FormEvent<HTMLInputElement>) => void;
  checkedInput: string | null;
}) {
  const { label, name } = inputDetails;

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
        <Markup content={label} />
      </label>
    </div>
  );
}

export default RadioInput;
