import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type {
  Currency,
  FieldOption,
  PaymentMethodName,
  ShippingOptionName,
} from "@/types/types";

interface UIInterface {
  categories: string[];
  currencies: Currency[];
  shippingOptions: FieldOption<ShippingOptionName>[];
  paymentOptions: FieldOption<PaymentMethodName>[];
  isCurrencySwitcherOpen: boolean;
  isMiniCartOpen: boolean;
  isMobileNavOpen: boolean;
  isToastOpen: boolean;
  isAccountMenuOpen: boolean;
}

interface FieldOptions {
  shipping: FieldOption<ShippingOptionName>[];
  payment: FieldOption<PaymentMethodName>[];
}

const initialState: UIInterface = {
  categories: [],
  currencies: [],
  shippingOptions: [],
  paymentOptions: [],
  isCurrencySwitcherOpen: false,
  isMiniCartOpen: false,
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
    saveShippingAndPaymentOptions(state, action: PayloadAction<FieldOptions>) {
      const { payment, shipping } = action.payload;

      return { ...state, shippingOptions: shipping, paymentOptions: payment };
    },
    currencySwitcherVisibToggle(state, action) {
      return { ...state, isCurrencySwitcherOpen: action.payload };
    },
    miniCartVisibilityToggle(state, action) {
      return { ...state, isMiniCartOpen: action.payload };
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
