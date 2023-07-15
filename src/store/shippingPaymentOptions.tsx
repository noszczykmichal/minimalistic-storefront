import { createSlice } from "@reduxjs/toolkit";

interface RadioInput {
  value: string;
  cost: number;
  isSelected: boolean;
}

const initialState: {
  inputs: { [key: string]: RadioInput };
  isFormValid: boolean;
} = {
  inputs: {},
  isFormValid: false,
};

const shippingPaymentOptions = createSlice({
  name: "shippingPaymentOptions",
  initialState,
  reducers: {
    registerOption(state, action) {
      const inputToBeRegistered = {
        value: "",
        cost: 0,
        isSelected: false,
      };

      return {
        ...state,
        inputs: { ...state.inputs, [action.payload]: inputToBeRegistered },
      };
    },
    optionChangeHandler(state, action) {
      const updatedOption = {
        value: action.payload.name,
        cost: action.payload.optionCost,
        isSelected: true,
      };

      const areOtherOptionsChecked = Object.keys(state.inputs)
        .filter((option) => option !== action.payload.identifier)
        .every(
          (filteredOutOption) => state.inputs[filteredOutOption].isSelected,
        );

      return {
        ...state,
        inputs: {
          ...state.inputs,
          [action.payload.identifier]: updatedOption,
        },
        isFormValid: areOtherOptionsChecked && true,
      };
    },
    updatePriceOfAnOption(state, action) {
      const { fieldsetId, optionPrice } = action.payload;
      const updatedOption = { ...state.inputs[fieldsetId] };
      updatedOption.cost = optionPrice;
      return {
        ...state,
        inputs: { ...state.inputs, [fieldsetId]: updatedOption },
      };
    },
  },
});

export const shippingPaymentOptionsActions = shippingPaymentOptions.actions;

export default shippingPaymentOptions;
