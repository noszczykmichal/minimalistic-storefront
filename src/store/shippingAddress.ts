import { createSlice } from "@reduxjs/toolkit";

interface Input {
  value: string;
  isTouched: boolean;
  isValid: boolean;
  hasError: boolean;
}

interface ShippingAddressInterface {
  inputs: { [key: string]: Input };
  isFormValid: boolean;
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
          isTouched: false,
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
      const isTouched = true;
      const hasError = false;
      const updatedInput = {
        value,
        isTouched,
        isValid: isCurrentInputValid,
        hasError,
      };

      const filteredInputs = Object.keys(state.inputs)
        .filter((input) => input !== name)
        .map((filteredInput) => state.inputs[filteredInput].isValid);

      const areOtherInputsValid = filteredInputs.every((el) => el === true);
      const isFormValid = areOtherInputsValid && isCurrentInputValid;

      return {
        ...state,
        inputs: { ...state.inputs, [name]: updatedInput },
        isFormValid,
      };
    },

    inputBlurHandler(state, action) {
      const { value, name, validator } = action.payload;
      const isCurrentInputValid = validator(value);
      const isTouched = true;
      const hasError = !isCurrentInputValid && isTouched;

      const updatedInput = {
        value,
        isTouched,
        isValid: isCurrentInputValid,
        hasError,
      };

      const filteredInputs = Object.keys(state.inputs)
        .filter((input) => input !== name)
        .map((filteredInput) => state.inputs[filteredInput].isValid);

      const areOtherInputsValid = filteredInputs.every((el) => el === true);
      const isFormValid = areOtherInputsValid && isCurrentInputValid;

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
