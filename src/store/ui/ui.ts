import { createSlice } from "@reduxjs/toolkit";
import { Currency } from "@/types/types";

interface UIInterface {
  categories: string[];
  currencies: Currency[];
  isCurrencySwitcherOpen: boolean;
  isMiniCartOpen: boolean;
  isModalOpen: boolean;
  isMobileNavOpen: boolean;
  isToastOpen: boolean;
  isAccountMenuOpen: boolean;
}

const initialState: UIInterface = {
  categories: [],
  currencies: [],
  isCurrencySwitcherOpen: false,
  isMiniCartOpen: false,
  isModalOpen: false,
  isMobileNavOpen: false,
  isToastOpen: false,
  isAccountMenuOpen: false,
};

const ui = createSlice({
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
    toastVisibilityToggle(state, action) {
      return { ...state, isToastOpen: action.payload };
    },
    accountMenuVisibilityToggle(state, action) {
      return { ...state, isAccountMenuOpen: action.payload };
    },
  },
});

export const uiActions = ui.actions;

export default ui;
