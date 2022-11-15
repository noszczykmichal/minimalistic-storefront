import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  categories: [],
  currencies: [],
  isBackdropOpen: false,
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
    backdropToggle(state) {
      return {
        ...state,
        isBackdropOpen: !state.isBackdropOpen,
      };
    },
  },
});

export default uiSlice;
