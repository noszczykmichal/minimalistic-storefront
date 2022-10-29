import { createSlice } from "@reduxjs/toolkit";

const initialState = { categories: [], currencies: [] };

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    saveCategoriesAndCurrencies(state, action) {
      return {
        ...state,
        categories: action.payload.categories,
        currencies: action.payload.currencies,
      };
    },
  },
});

export default uiSlice;
