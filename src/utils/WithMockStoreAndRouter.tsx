import { ReactNode } from "react";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import { MemoryRouter } from "react-router";
import { Store } from "@reduxjs/toolkit";

interface WithMockStoreAndRouterProps {
  children: ReactNode;
  customStore?: Store;
}

const mockStore = configureMockStore();

function WithMockStoreAndRouter({
  children,
  customStore,
}: WithMockStoreAndRouterProps) {
  const store = customStore || mockStore({});

  return (
    <Provider store={store}>
      <MemoryRouter>{children}</MemoryRouter>
    </Provider>
  );
}

WithMockStoreAndRouter.defaultProps = {
  customStore: undefined,
};

export default WithMockStoreAndRouter;
