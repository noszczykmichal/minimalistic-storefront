import { createSlice } from "@reduxjs/toolkit";

const initialState = { billingCurrency: "$", currentPDP: "" };

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    onCurrencyChange(state, action) {
      return { ...state, billingCurrency: action.payload };
    },
    onCurrentPDPChange(state, action) {
      return { ...state, currentPDP: action.payload };
    },
  },
});

export default productsSlice;
