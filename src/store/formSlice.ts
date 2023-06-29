import { createSlice } from "@reduxjs/toolkit";
// import { FormEvent } from "react";

interface Input {
  name: {
    value: string;
    isTouched: boolean;
    isValid: boolean;
    hasError: boolean;
  };
}

// const reg=[{name: {value, isTouch, isValid, hasError} } ]

const initialState: {
  registeredInputs: { [key: string]: Input };
  isFormValid: boolean;
} = {
  registeredInputs: {},
  isFormValid: false,
};

const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    registerInput(state, action) {
      const registeredInput: Input = {
        value: "",
        isTouched: false,
        isValid: false,
        hasError: false,
      };

      return { ...state };
    },
  },
});

export const formActions = formSlice.actions;

export default formSlice;
