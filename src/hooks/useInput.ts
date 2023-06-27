import { useState, FormEvent } from "react";

function useInput(validationFn: (value: string) => boolean) {
  const [enteredValue, setEnteredValue] = useState<string>("");
  const [isTouched, setIsTouched] = useState<boolean>();
  const isValid = validationFn(enteredValue);
  const hasError = !isValid && isTouched;

  const inputChangeHandler = (event: FormEvent<HTMLInputElement>) => {
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
