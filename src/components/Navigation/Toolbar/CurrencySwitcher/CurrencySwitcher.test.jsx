jest.mock("../../../../hooks/useReduxHooks.ts", () => ({
  useAppDispatch: jest.fn(),
  useAppSelector: jest.fn(),
}));

import { render, screen } from "@testing-library/react";

import CurrencySwitcher from "./CurrencySwitcher";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../../hooks/useReduxHooks";

const testCurrencies = [
  { label: "USD", symbol: "$" },
  { label: "GBP", symbol: "£" },
];

describe("CurrencySwitcher component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  const dispatch = jest.fn();
  it("should render closed Switcher displaying chosen currency when isCurrencySwitcherOpen is false", () => {
    useAppSelector.mockReturnValue({
      isCurrencySwitcherOpen: false,
      billingCurrency: "$",
    });
    useAppDispatch.mockReturnValue(dispatch);

    render(<CurrencySwitcher currencies={testCurrencies} />);
    const currenciesPane = screen.getByLabelText("currencies-pane");
    const currenciesList = screen.queryByLabelText("currencies-list");

    expect(currenciesPane).toBeInTheDocument();
    expect(currenciesPane.textContent).toBe(testCurrencies[0].symbol);
    expect(currenciesList).not.toBeInTheDocument();
  });
});
