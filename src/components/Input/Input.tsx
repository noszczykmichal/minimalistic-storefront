import { useEffect, FormEvent } from "react";

import classes from "./Input.module.css";
import { formActions } from "../../store/formSlice";
import { useAppSelector, useAppDispatch } from "../../hooks/useReduxHooks";

interface InputProps {
  label: string;
  name: string;
  type: string;
  errorMessage: string;
  validator: (length: string) => boolean;
}

function Input({ inputDetails }: { inputDetails: InputProps }) {
  const { label, name, type, errorMessage, validator } = inputDetails;
  const { registerInput, inputChangeHandler, inputBlurHandler } = formActions;
  const { inputs } = useAppSelector((state) => state.form);
  const dispatch = useAppDispatch();
  const currentInput = inputs[name];
  const currentValue = currentInput ? currentInput.value : "";

  useEffect(() => {
    dispatch(registerInput(name));
  }, [dispatch, name, registerInput]);

  const onChangeHandler = (event: FormEvent<HTMLInputElement>) => {
    dispatch(
      inputChangeHandler({
        value: event.currentTarget.value,
        name,
        validator,
      }),
    );
  };

  const onBlurHandler = (event: FormEvent<HTMLInputElement>) => {
    dispatch(
      inputBlurHandler({
        value: event.currentTarget.value,
        name,
        validator,
      }),
    );
  };

  const attachedClasses = currentInput?.hasError
    ? [classes["form-control__input"], classes["form-control__input--hasError"]]
    : [classes["form-control__input"]];
  return (
    <div className={classes["form-control"]}>
      <label htmlFor={name}>
        {label}
        <input
          type={type}
          name={name}
          className={attachedClasses.join(" ")}
          onChange={onChangeHandler}
          onBlur={onBlurHandler}
          value={currentValue}
        />
      </label>
      {currentInput?.hasError && (
        <p className={classes["form-control__message"]}>{errorMessage}</p>
      )}
    </div>
  );
}

export default Input;
