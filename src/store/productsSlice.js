import { createSlice } from "@reduxjs/toolkit";

const initialState = { billingCurrency: "$" };

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    onCurrencyChange(state, action) {
      return { ...state, billingCurrency: action.payload };
    },
  },
});

export default productsSlice;
