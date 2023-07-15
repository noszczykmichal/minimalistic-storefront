import { useEffect, FormEvent } from "react";

import classes from "./TextInput.module.css";
import { shippingAddressActions } from "../../../../store/shippingAddress";
import {
  useAppSelector,
  useAppDispatch,
} from "../../../../hooks/useReduxHooks";

interface TextInputProps {
  label: string;
  name: string;
  type: string;
  errorMessage: string;
  validator: (length: string) => boolean;
}

function TextInput({ inputDetails }: { inputDetails: TextInputProps }) {
  const { label, name, type, errorMessage, validator } = inputDetails;
  const { registerInput, inputChangeHandler, inputBlurHandler } =
    shippingAddressActions;
  const { inputs } = useAppSelector((state) => state.shippingAddress);
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

export default TextInput;
