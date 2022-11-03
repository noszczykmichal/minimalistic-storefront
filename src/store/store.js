import { configureStore } from "@reduxjs/toolkit";

import uiSlice from "./uiSlice";
import productsSlice from "./productsSlice";

const store = configureStore({
  reducer: {
    ui: uiSlice.reducer,
    products: productsSlice.reducer,
  },
});

export default store;
