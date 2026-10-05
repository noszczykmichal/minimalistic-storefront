import { ReactNode } from "react";
import { Provider } from "react-redux";
import { legacy_configureStore as configureMockStore } from "redux-mock-store";
import { MemoryRouter } from "react-router";
import { Store } from "@reduxjs/toolkit";

interface WithMockStoreAndRouterProps {
  children: ReactNode;
  customStore?: Store;
  initialPath?: string;
}

const mockStore = configureMockStore();

export default function WithMockStoreAndRouter({
  children,
  customStore = undefined,
  initialPath = "/",
}: WithMockStoreAndRouterProps) {
  const store = customStore || mockStore({});

  return (
    <Provider store={store}>
      <MemoryRouter initialEntries={[initialPath]}>{children}</MemoryRouter>
    </Provider>
  );
}
