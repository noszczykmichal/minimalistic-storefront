import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  categories: [],
  currencies: [],
  isBackdropOpen: false,
  isBackdropTransparent: false,
  isCurrencySwitcherOpen: false,
  isMiniCartOpen: false,
  isModalOpen: false,
  isMobileNavOpen: false,
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
    currencySwitcherVisibToggle(state, action) {
      return { ...state, isCurrencySwitcherOpen: action.payload };
    },
    miniCartVisibilityToggle(state, action) {
      return { ...state, isMiniCartOpen: action.payload };
    },
    modalToggle(state, action) {
      return { ...state, isModalOpen: action.payload };
    },
    mobileNavVisibilityToggle(state, action) {
      return { ...state, isMobileNavOpen: action.payload };
    },
  },
});

export const uiActions = uiSlice.actions;

export default uiSlice;
