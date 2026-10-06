import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { Currency, BackdropMode } from "@/types/types";

const initialState: {
  categories: string[];
  currencies: Currency[];
  isBackdropOpen: boolean;
  backdropMode: BackdropMode;
  isCurrencySwitcherOpen: boolean;
  isMiniCartOpen: boolean;
  isModalOpen: boolean;
  isMobileNavOpen: boolean;
  isRegistrationModalOpen: boolean;
} = {
  categories: [],
  currencies: [],
  isBackdropOpen: false,
  backdropMode: "dark",
  isCurrencySwitcherOpen: false,
  isMiniCartOpen: false,
  isModalOpen: false,
  isMobileNavOpen: false,
  isRegistrationModalOpen: false,
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
    backdropTypeToggle(state, action: PayloadAction<BackdropMode>) {
      return { ...state, backdropMode: action.payload };
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
    openRegistrationModal(state) {
      return { ...state, isRegistrationModalOpen: true };
    },
    closeRegistrationModal(state) {
      return { ...state, isRegistrationModalOpen: false };
    },
  },
});

export const uiActions = uiSlice.actions;

export default uiSlice;
