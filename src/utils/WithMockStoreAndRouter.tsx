import { ReactNode } from "react";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import { MemoryRouter } from "react-router";

const mockStore = configureMockStore();

function WithMockStoreAndRouter({ children }: { children: ReactNode }) {
  const store = mockStore({});

  return (
    <Provider store={store}>
      <MemoryRouter>{children}</MemoryRouter>
    </Provider>
  );
}

export default WithMockStoreAndRouter;
