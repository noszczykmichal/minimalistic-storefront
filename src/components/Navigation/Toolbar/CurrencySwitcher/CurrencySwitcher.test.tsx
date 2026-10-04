vi.mock("@/hooks/useReduxHooks", () => ({
  useAppDispatch: vi.fn(),
  useAppSelector: vi.fn(),
}));

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "vitest-axe";

import CurrencySwitcher from "@/components/Navigation/Toolbar/CurrencySwitcher/CurrencySwitcher";
import { useAppDispatch, useAppSelector } from "@/hooks/useReduxHooks";
import { uiActions } from "@/store/uiSlice";
import { productActions } from "@/store/productsSlice";
import type { RootState } from "@/store/store";
import type { Currency } from "@/types/types";

const testCurrencies: Currency[] = [
  { label: "USD", symbol: "$" },
  { label: "GBP", symbol: "£" },
];

const mockSwitcherState = (
  isCurrencySwitcherOpen: boolean,
  billingCurrency = "$",
) => {
  const state = {
    ui: { isCurrencySwitcherOpen },
    products: { billingCurrency },
  } as unknown as RootState;

  vi.mocked(useAppSelector).mockImplementation((selector) => selector(state));
};

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

  it("should display the billing currency on the switcher button", () => {
    mockSwitcherState(false, "£");

    render(<CurrencySwitcher currencies={testCurrencies} />);

    expect(
      screen.getByRole("button", { name: "Currencies Pane" }),
    ).toHaveTextContent("£");
  });

  it("should not render the currencies list when isCurrencySwitcherOpen is false", () => {
    mockSwitcherState(false);

    render(<CurrencySwitcher currencies={testCurrencies} />);

    expect(screen.queryByRole("list")).not.toBeInTheDocument();
  });

  it("should render the provided currencies when isCurrencySwitcherOpen is true", () => {
    mockSwitcherState(true);

    render(<CurrencySwitcher currencies={testCurrencies} />);

    expect(screen.getByRole("list")).toBeInTheDocument();
    expect(screen.getAllByRole("listitem")).toHaveLength(testCurrencies.length);
  });

  it("should dispatch 4 actions when the switcher button is clicked", async () => {
    mockSwitcherState(false);

    render(<CurrencySwitcher currencies={testCurrencies} />);
    await userEvent.click(
      screen.getByRole("button", { name: "Currencies Pane" }),
    );

    expect(dispatch).toHaveBeenCalledTimes(4);
    expect(dispatch).toHaveBeenCalledWith(currencySwitcherVisibToggle(true));
    expect(dispatch).toHaveBeenCalledWith(backdropTypeToggle(true));
    expect(dispatch).toHaveBeenCalledWith(backdropVisibilityToggle(true));
    expect(dispatch).toHaveBeenCalledWith(miniCartVisibilityToggle(false));
  });

  it("should dispatch 3 actions with the chosen currency when an option is clicked", async () => {
    mockSwitcherState(true);

    render(<CurrencySwitcher currencies={testCurrencies} />);
    await userEvent.click(screen.getByLabelText("£"));

    expect(dispatch).toHaveBeenCalledTimes(3);
    expect(dispatch).toHaveBeenCalledWith(currencySwitcherVisibToggle(false));
    expect(dispatch).toHaveBeenCalledWith(onCurrencyChange("£"));
    expect(dispatch).toHaveBeenCalledWith(backdropVisibilityToggle(false));
  });

  it("should have no accessibility violations when open", async () => {
    mockSwitcherState(true);

    const { container } = render(
      <CurrencySwitcher currencies={testCurrencies} />,
    );

    expect(await axe(container)).toHaveNoViolations();
  });
});
