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
  beforeEach(() => {
    jest.clearAllMocks();
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
    const currenciesList = screen.queryByLabelText("currencies-list");

    expect(currenciesList).not.toBeInTheDocument();
  });

  it("should render CurrencySwitcher with provided list of currencies when isCurrencySwitcherOpen is true", () => {
    useAppSelector.mockReturnValue({
      isCurrencySwitcherOpen: true,
      billingCurrency: "$",
    });

    render(<CurrencySwitcher currencies={testCurrencies} />);
    const currenciesList = screen.queryByLabelText("currencies-list");
    const option1 = screen.getByLabelText(testCurrencies[0].symbol);
    const option2 = screen.getByText(testCurrencies[1].symbol);

    expect(currenciesList).toBeInTheDocument();
    expect(option1).toBeInTheDocument();
    expect(option2).toBeInTheDocument();
  });

  it("should dispatch 4 actions on button click", () => {
    useAppSelector.mockReturnValue({
      isCurrencySwitcherOpen: true,
      billingCurrency: "$",
    });
    const {
      backdropVisibilityToggle,
      backdropTypeToggle,
      currencySwitcherVisibToggle,
      miniCartVisibilityToggle,
    } = uiActions;
    const dispatch = jest.fn();
    useAppDispatch.mockReturnValue(dispatch);

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
    const { backdropVisibilityToggle, currencySwitcherVisibToggle } = uiActions;
    const { onCurrencyChange } = productActions;

    const dispatch = jest.fn();
    useAppDispatch.mockReturnValue(dispatch);

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