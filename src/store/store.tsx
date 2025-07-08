import { configureStore, combineReducers } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import thunk from "redux-thunk";

import uiSlice from "@/store/uiSlice";
import productsSlice from "@/store/productsSlice";
import shippingAddress from "@/store/shippingAddress";
import shippingPaymentOptions from "@/store/shippingPaymentOptions";

const rootReducer = combineReducers({
  ui: uiSlice.reducer,
  products: productsSlice.reducer,
  shippingAddress: shippingAddress.reducer,
  shippingPaymentOptions: shippingPaymentOptions.reducer,
});

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk],
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
