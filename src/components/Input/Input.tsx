import { useEffect, FormEvent } from "react";

import classes from "./Input.module.css";
import { formActions } from "../../store/formSlice";
import { useAppSelector, useAppDispatch } from "../../hooks/useReduxHooks";

interface InputProps {
  label: string;
  name: string;
  type: string;
  validator: (length: string) => boolean;
}

function Input({ inputDetails }: { inputDetails: InputProps }) {
  // hasFNameError && <p>This value should be valid</p> to do pociągnięcia z reduxa
  const { label, name, type } = inputDetails;
  const { registerInput, inputChangeHandler } = formActions;
  const { inputs } = useAppSelector((state) => state.form);
  const dispatch = useAppDispatch();
  const currentValue = inputs[name] ? inputs[name].value : "";

  useEffect(() => {
    dispatch(registerInput(name));
  }, [dispatch, name, registerInput]);

  const onChangeHandler = (event: FormEvent<HTMLInputElement>) => {
    dispatch(
      inputChangeHandler({
        value: event.currentTarget.value,
        name,
        validator: inputDetails.validator,
      }),
    );
  };

  return (
    <div className={classes["form-control"]}>
      <label htmlFor={name}>
        {label}
        <input
          type={type}
          name={name}
          onChange={onChangeHandler}
          value={currentValue}
        />
      </label>
    </div>
  );
}

export default Input;
