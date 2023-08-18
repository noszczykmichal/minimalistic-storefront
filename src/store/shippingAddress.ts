import { createSlice } from "@reduxjs/toolkit";

interface Input {
  value: string;
  isValid: boolean;
  hasError: boolean;
}

interface ShippingAddressInterface {
  inputs: { [key: string]: Input };
  isFormValid: boolean;
}

interface ActionInterface {
  payload: any;
  type: string;
}

function inputStateHandler(
  state: ShippingAddressInterface,
  action: ActionInterface,
  isValid: boolean,
  hasError: boolean,
) {
  const { value, name } = action.payload;
  const isCurrentInputValid = isValid;

  const updatedInput: Input = {
    value,
    isValid: isCurrentInputValid,
    hasError,
  };

  const filteredInputs = Object.keys(state.inputs)
    .filter((input) => input !== name)
    .map((filteredInput) => state.inputs[filteredInput].isValid);

  const areOtherInputsValid = filteredInputs.every((el) => el === true);
  const isFormValid = areOtherInputsValid && isCurrentInputValid;

  return { updatedInput, isFormValid };
}

const initialState: ShippingAddressInterface = {
  inputs: {},
  isFormValid: false,
};

const shippingAddress = createSlice({
  name: "shippingAddress",
  initialState,
  reducers: {
    registerInput(state, action) {
      const inputName = action.payload;
      let inputState = state.inputs[inputName];
      const isFormValid = Object.keys(state.inputs).every(
        (input) => state.inputs[input].isValid === true,
      );

      if (!state.inputs[inputName]) {
        inputState = {
          value: "",
          isValid: false,
          hasError: false,
        };
      }

      return {
        ...state,
        inputs: {
          ...state.inputs,
          [inputName]: inputState,
        },
        isFormValid,
      };
    },
    inputChangeHandler(state, action) {
      const { value, name, validator } = action.payload;
      const isCurrentInputValid = validator(value);
      const { updatedInput, isFormValid } = inputStateHandler(
        state,
        action,
        isCurrentInputValid,
        false,
      );

      return {
        ...state,
        inputs: { ...state.inputs, [name]: updatedInput },
        isFormValid,
      };
    },

    inputBlurHandler(state, action) {
      const { value, name, validator } = action.payload;
      const isCurrentInputValid = validator(value);
      const hasError = !isCurrentInputValid;

      const { updatedInput, isFormValid } = inputStateHandler(
        state,
        action,
        isCurrentInputValid,
        hasError,
      );

      return {
        ...state,
        inputs: { ...state.inputs, [name]: updatedInput },
        isFormValid,
      };
    },
    clearShippingAddress(state) {
      return {
        ...state,
        inputs: {},
        isFormValid: false,
      };
    },
  },
});

export const shippingAddressActions = shippingAddress.actions;

export default shippingAddress;
