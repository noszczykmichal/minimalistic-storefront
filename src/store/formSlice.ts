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

const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    registerInput(state, action) {
      const inputToBeRegistered: Input = {
        value: "",
        isTouched: false,
        isValid: false,
        hasError: false,
      };

      return {
        ...state,
        inputs: {
          ...state.inputs,
          [action.payload]: inputToBeRegistered,
        },
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

      return {
        ...state,
        inputs: { ...state.inputs, [name]: updatedInput },
      };
    },
  },
});

export const formActions = formSlice.actions;

export default formSlice;
