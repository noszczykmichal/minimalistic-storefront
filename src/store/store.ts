import { configureStore, combineReducers } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

import uiSlice from "@/store/ui/ui";
import productsSlice from "@/store/products/products";
import shippingAddressAndPayment from "@/store/shippingAddressAndPayment/shippingAddressAndPayment";
import auth from "@/store/auth/auth";

const rootReducer = combineReducers({
  ui: uiSlice.reducer,
  products: productsSlice.reducer,
  shippingAddressAndPayment: shippingAddressAndPayment.reducer,
  auth: auth.reducer,
});

const persistConfig = {
  key: "root",
  storage,
  blacklist: ["ui", "auth"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  devTools: import.meta.env.DEV,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
