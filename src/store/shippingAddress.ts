import { createSlice } from "@reduxjs/toolkit";

interface Input {
  value: string;
  isTouched: boolean;
  isValid: boolean;
  hasError: boolean;
}

const initialState: {
  inputs: { [key: string]: Input };
  isFormValid: boolean;
} = {
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
      const isValid = validator(value);
      const isTouched = true;
      const hasError = false;
      const updatedInput = {
        value,
        isTouched,
        isValid,
        hasError,
      };

      const isFormValid = Object.keys(state.inputs).every(
        (input) => state.inputs[input].isValid === true,
      );

      return {
        ...state,
        inputs: { ...state.inputs, [name]: updatedInput },
        isFormValid,
      };
    },

    inputBlurHandler(state, action) {
      const { value, name, validator } = action.payload;
      const isValid = validator(value);
      const isTouched = true;
      const hasError = !isValid && isTouched;
      const updatedInput = {
        value,
        isTouched,
        isValid,
        hasError,
      };

      const isFormValid = Object.keys(state.inputs).every(
        (input) => state.inputs[input].isValid === true,
      );

      return {
        ...state,
        inputs: { ...state.inputs, [name]: updatedInput },
        isFormValid,
      };
    },
  },
});

export const shippingAddressActions = shippingAddress.actions;

export default shippingAddress;
