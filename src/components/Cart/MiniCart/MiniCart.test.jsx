jest.mock("../../../hooks/useReduxHooks.ts", () => ({
  ...jest.requireActual("../../../hooks/useReduxHooks.ts"),
  useAppDispatch: jest.fn(),
}));
import { render, screen } from "@testing-library/react";
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router";

import { useAppDispatch } from "../../../hooks/useReduxHooks";
import { testItemDetails } from "../../../utils/testData";
import MiniCart from "./MiniCart";

const mockStore = configureStore([]);

describe("MiniCart component", () => {
  const dispatch = jest.fn();
  let store;
  beforeEach(() => {
    jest.clearAllMocks();

    useAppDispatch.mockReturnValue(dispatch);
  });

  it("should render a heading containing the word 'item' when 'productsTotal' is 1", () => {
    store = mockStore({
      ui: { isMiniCartOpen: true },
      products: {
        cart: [testItemDetails],
        productsTotal: 1,
        totalPrice: 144.69,
        billingCurrency: "$",
      },
    });
    render(
      <Provider store={store}>
        <MemoryRouter>
          <MiniCart />
        </MemoryRouter>
      </Provider>,
    );

    const heading = screen.getByText(/My Bag/);
    const wordPattern = /\bitem\b/;

    expect(wordPattern.test(heading.textContent)).toBe(true);
  });

  it("should render a heading containing the word 'items' when 'productsTotal' is 2 or greater", () => {
    store = mockStore({
      ui: { isMiniCartOpen: true },
      products: {
        cart: [testItemDetails],
        productsTotal: 2,
        totalPrice: 144.69,
        billingCurrency: "$",
      },
    });
    render(
      <Provider store={store}>
        <MemoryRouter>
          <MiniCart />
        </MemoryRouter>
      </Provider>,
    );

    const heading = screen.getByText(/My Bag/);
    const wordPattern = /\bitems\b/;

    expect(wordPattern.test(heading.textContent)).toBe(true);
  });
});
