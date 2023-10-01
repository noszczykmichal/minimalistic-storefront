jest.mock("../../../../hooks/useReduxHooks.ts", () => ({
  useAppDispatch: jest.fn(),
  useAppSelector: jest.fn(),
}));

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import CurrencySwitcher from "./CurrencySwitcher";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../../hooks/useReduxHooks";
import { uiActions } from "../../../../store/uiSlice";
import { productActions } from "../../../../store/productsSlice";

const testCurrencies = [
  { label: "USD", symbol: "$" },
  { label: "GBP", symbol: "£" },
];

describe("CurrencySwitcher component", () => {
  const dispatch = jest.fn();
  const {
    backdropVisibilityToggle,
    backdropTypeToggle,
    currencySwitcherVisibToggle,
    miniCartVisibilityToggle,
  } = uiActions;

  beforeEach(() => {
    jest.clearAllMocks();
    useAppDispatch.mockReturnValue(dispatch);
  });

  it("should render CurrencySwitcher displaying chosen currency when isCurrencySwitcherOpen is false", () => {
    useAppSelector.mockReturnValue({
      isCurrencySwitcherOpen: false,
      billingCurrency: "$",
    });

    render(<CurrencySwitcher currencies={testCurrencies} />);
    const currenciesPane = screen.getByLabelText("currencies-pane");

    expect(currenciesPane).toBeInTheDocument();
    expect(currenciesPane.textContent).toBe(testCurrencies[0].symbol);
  });

  it("should render CurrencySwitcher without currencies list when isCurrencySwitcherOpen is false", () => {
    useAppSelector.mockReturnValue({
      isCurrencySwitcherOpen: false,
      billingCurrency: "$",
    });

    render(<CurrencySwitcher currencies={testCurrencies} />);
    const currenciesList = screen.queryByRole("list");

    expect(currenciesList).not.toBeInTheDocument();
  });

  it("should render CurrencySwitcher with provided list of currencies when isCurrencySwitcherOpen is true", () => {
    useAppSelector.mockReturnValue({
      isCurrencySwitcherOpen: true,
      billingCurrency: "$",
    });

    render(<CurrencySwitcher currencies={testCurrencies} />);
    const currenciesList = screen.queryByRole("list");
    const options = screen.getAllByRole("listitem");

    expect(currenciesList).toBeInTheDocument();
    expect(options).toHaveLength(testCurrencies.length);
  });

  it("should dispatch 4 actions on button click", () => {
    useAppSelector.mockReturnValue({
      isCurrencySwitcherOpen: true,
      billingCurrency: "$",
    });

    render(<CurrencySwitcher currencies={testCurrencies} />);
    const button = screen.getByRole("button");
    userEvent.click(button);

    expect(dispatch).toHaveBeenCalledTimes(4);
    expect(dispatch).toHaveBeenCalledWith(currencySwitcherVisibToggle(true));
    expect(dispatch).toHaveBeenCalledWith(backdropTypeToggle(true));
    expect(dispatch).toHaveBeenCalledWith(backdropVisibilityToggle(true));
    expect(dispatch).toHaveBeenCalledWith(miniCartVisibilityToggle(false));
  });

  it("should dispatch 3 actions on option click", () => {
    useAppSelector.mockReturnValue({
      isCurrencySwitcherOpen: true,
      billingCurrency: "$",
    });

    const { onCurrencyChange } = productActions;

    render(<CurrencySwitcher currencies={testCurrencies} />);
    const option = screen.getByLabelText(testCurrencies[0].symbol);
    userEvent.click(option);

    expect(dispatch).toHaveBeenCalledTimes(3);
    expect(dispatch).toHaveBeenCalledWith(currencySwitcherVisibToggle(false));
    expect(dispatch).toHaveBeenCalledWith(backdropVisibilityToggle(false));
    expect(dispatch).toHaveBeenCalledWith(
      onCurrencyChange(option.getAttribute("aria-label")),
    );
  });
});
