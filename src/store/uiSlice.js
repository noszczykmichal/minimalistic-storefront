import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  categories: [],
  currencies: [],
  isBackdropOpen: false,
  isBackdropTransparent: false,
};

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
    backdropVisibilityToggle(state, action) {
      return {
        ...state,
        isBackdropOpen: action.payload,
      };
    },
    backdropTypeToggle(state, action) {
      return { ...state, isBackdropTransparent: action.payload };
    },
  },
});

export default uiSlice;
