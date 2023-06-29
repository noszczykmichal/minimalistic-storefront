import { useState, FormEvent } from "react";

// import { useAppSelector } from "./useReduxHooks";
// import { useAppDispatch } from "./useReduxHooks";
// import { formActions } from "../store/formSlice";

function useInput(validationFn: (value: string) => boolean) {
  // const { registeredInputs } = useAppSelector((state) => state.form);
  // const dispatch = useAppDispatch();
  // const { inputChange } = formActions;
  const [enteredValue, setEnteredValue] = useState<string>("");
  const [isTouched, setIsTouched] = useState<boolean>();
  const isValid = validationFn(enteredValue);
  const hasError = !isValid && isTouched;

  const inputChangeHandler = (event: FormEvent<HTMLInputElement>) => {
    // dispatch(
    //   inputChange({
    //     value: event.currentTarget.value,
    //     name: event.currentTarget.getAttribute("name"),
    //   }),
    // );
    setEnteredValue(event.currentTarget.value);
  };

  const inputBlurHandler = () => {
    setIsTouched(true);
  };

  const inputResetHandler = () => {
    setEnteredValue("");
  };

  // useEffect(() => {
  //   console.log("effect running");
  //   const timeout = setTimeout(() => {
  //     setIsValid(validationFn(enteredValue));
  //     console.log(["isValid: "], isValid);
  //   }, 500);

  //   return () => {
  //     clearTimeout(timeout);
  //   };
  // }, [enteredValue, isValid, validationFn]);

  return {
    enteredValue,
    isTouched,
    isValid,
    hasError,
    inputChangeHandler,
    inputBlurHandler,
    inputResetHandler,
  };
}

export default useInput;
