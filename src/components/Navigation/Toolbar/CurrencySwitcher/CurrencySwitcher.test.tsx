vi.mock("@/hooks/useReduxHooks", () => ({
  useAppDispatch: vi.fn(),
  useAppSelector: vi.fn(),
}));

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import CurrencySwitcher from "@/components/Navigation/Toolbar/CurrencySwitcher/CurrencySwitcher";
import { useAppDispatch, useAppSelector } from "@/hooks/useReduxHooks";
import { uiActions } from "@/store/uiSlice";
import { productActions } from "@/store/productsSlice";
import type { Currency } from "@/types/types";

const testCurrencies: Currency[] = [
  { label: "USD", symbol: "$" },
  { label: "GBP", symbol: "£" },
];

describe("CurrencySwitcher component", () => {
  const dispatch = vi.fn();
  const {
    backdropVisibilityToggle,
    backdropTypeToggle,
    currencySwitcherVisibToggle,
    miniCartVisibilityToggle,
  } = uiActions;

  const { onCurrencyChange } = productActions;

  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(useAppDispatch).mockReturnValue(dispatch);
  });

  it("should render CurrencySwitcher displaying chosen currency when isCurrencySwitcherOpen is false", () => {
    vi.mocked(useAppSelector).mockReturnValue({
      isCurrencySwitcherOpen: false,
      billingCurrency: "$",
    });

    render(<CurrencySwitcher currencies={testCurrencies} />);
    const button = screen.getByRole("button");

    expect(button).toBeInTheDocument();
    expect(button.textContent).toBe(testCurrencies[0].symbol);
  });

  it("should render CurrencySwitcher without currencies list when isCurrencySwitcherOpen is false", () => {
    vi.mocked(useAppSelector).mockReturnValue({
      isCurrencySwitcherOpen: false,
      billingCurrency: "$",
    });

    render(<CurrencySwitcher currencies={testCurrencies} />);
    const currenciesList = screen.queryByRole("list");

    expect(currenciesList).not.toBeInTheDocument();
  });

  it("should render CurrencySwitcher with provided list of currencies when isCurrencySwitcherOpen is true", () => {
    vi.mocked(useAppSelector).mockReturnValue({
      isCurrencySwitcherOpen: true,
      billingCurrency: "$",
    });

    render(<CurrencySwitcher currencies={testCurrencies} />);
    const currenciesList = screen.queryByRole("list");
    const options = screen.getAllByRole("listitem");

    expect(currenciesList).toBeInTheDocument();
    expect(options).toHaveLength(testCurrencies.length);
  });

  it("should dispatch 4 actions on button click", async () => {
    vi.mocked(useAppSelector).mockReturnValue({
      isCurrencySwitcherOpen: true,
      billingCurrency: "$",
    });

    render(<CurrencySwitcher currencies={testCurrencies} />);
    const button = screen.getByRole("button");
    await userEvent.click(button);

    expect(dispatch).toHaveBeenCalledTimes(4);
    expect(dispatch).toHaveBeenCalledWith(currencySwitcherVisibToggle(true));
    expect(dispatch).toHaveBeenCalledWith(backdropTypeToggle(true));
    expect(dispatch).toHaveBeenCalledWith(backdropVisibilityToggle(true));
    expect(dispatch).toHaveBeenCalledWith(miniCartVisibilityToggle(false));
  });

  it("should dispatch 3 actions on option click", async () => {
    vi.mocked(useAppSelector).mockReturnValue({
      isCurrencySwitcherOpen: true,
      billingCurrency: "$",
    });

    render(<CurrencySwitcher currencies={testCurrencies} />);
    const option = screen.getByLabelText(testCurrencies[0].symbol);
    await userEvent.click(option);

    expect(dispatch).toHaveBeenCalledTimes(3);
    expect(dispatch).toHaveBeenCalledWith(currencySwitcherVisibToggle(false));
    expect(dispatch).toHaveBeenCalledWith(backdropVisibilityToggle(false));
    expect(dispatch).toHaveBeenCalledWith(
      onCurrencyChange(option.getAttribute("aria-label")),
    );
  });
});
