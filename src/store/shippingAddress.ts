import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Input {
  value: string;
  isValid: boolean;
  hasError: boolean;
}

interface ShippingAddressInterface {
  inputs: { [key: string]: Input };
  isFormValid: boolean;
}

interface InputPayload {
  value: string;
  name: string;
  isValid: boolean;
}

function inputStateHandler(
  state: ShippingAddressInterface,
  name: string,
  value: string,
  isValid: boolean,
  hasError: boolean,
) {
  const updatedInput: Input = {
    value,
    isValid,
    hasError,
  };

  const areOtherInputsValid = Object.keys(state.inputs)
    .filter((input) => input !== name)
    .every((filteredInput) => state.inputs[filteredInput].isValid);

  const isFormValid = areOtherInputsValid && isValid;

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
    registerInput(state, action: PayloadAction<string>) {
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
    inputChangeHandler(state, action: PayloadAction<InputPayload>) {
      const { value, name, isValid } = action.payload;

      const { updatedInput, isFormValid } = inputStateHandler(
        state,
        name,
        value,
        isValid,
        false,
      );

      return {
        ...state,
        inputs: { ...state.inputs, [name]: updatedInput },
        isFormValid,
      };
    },

    inputBlurHandler(state, action: PayloadAction<InputPayload>) {
      const { value, name, isValid } = action.payload;

      const { updatedInput, isFormValid } = inputStateHandler(
        state,
        name,
        value,
        isValid,
        !isValid,
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
