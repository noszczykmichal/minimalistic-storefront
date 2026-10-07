import { createSlice } from "@reduxjs/toolkit";
import { Currency } from "@/types/types";

const initialState: {
  categories: string[];
  currencies: Currency[];

  isCurrencySwitcherOpen: boolean;
  isMiniCartOpen: boolean;
  isModalOpen: boolean;
  isMobileNavOpen: boolean;
} = {
  categories: [],
  currencies: [],
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
