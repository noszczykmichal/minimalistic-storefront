vi.mock("@/hooks/useReduxHooks", () => ({
  useAppDispatch: vi.fn(),
  useAppSelector: vi.fn(),
}));

import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "vitest-axe";

import CurrencySwitcher from "@/components/Navigation/Toolbar/CurrencySwitcher/CurrencySwitcher";
import { useAppDispatch, useAppSelector } from "@/hooks/useReduxHooks";
import { uiActions } from "@/store/uiSlice";
import { productActions } from "@/store/products";
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

  let modalsRoot: HTMLDivElement;

  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(useAppDispatch).mockReturnValue(dispatch);

    modalsRoot = document.createElement("div");
    modalsRoot.id = "modals-root";
    document.body.appendChild(modalsRoot);
  });

  afterEach(() => {
    modalsRoot.remove();
    vi.restoreAllMocks();
  });

  it("should render the currencies dialog into #modals-root", () => {
    mockSwitcherState(true);

    render(<CurrencySwitcher currencies={testCurrencies} />);

    expect(
      within(modalsRoot).getByRole("dialog", { name: "Currencies" }),
    ).toBeInTheDocument();
  });

  it("should align the currencies dialog with the switcher button", () => {
    mockSwitcherState(true);
    vi.spyOn(HTMLElement.prototype, "getBoundingClientRect").mockReturnValue({
      left: 120,
    } as DOMRect);

    render(<CurrencySwitcher currencies={testCurrencies} />);

    expect(screen.getByRole("dialog", { name: "Currencies" })).toHaveStyle({
      left: "120px",
    });
  });

  it("should display the billing currency on the switcher button", () => {
    mockSwitcherState(false, "£");

    render(<CurrencySwitcher currencies={testCurrencies} />);

    expect(
      screen.getByRole("button", { name: "Currencies Pane" }),
    ).toHaveTextContent("£");
  });

  it.each([
    [false, "false"],
    [true, "true"],
  ])(
    "should expose the dialog state on the switcher button when isCurrencySwitcherOpen is %s",
    (isOpen, expanded) => {
      mockSwitcherState(isOpen);

      render(<CurrencySwitcher currencies={testCurrencies} />);
      const switcherButton = screen.getByRole("button", {
        name: "Currencies Pane",
      });

      expect(switcherButton).toHaveAttribute("aria-haspopup", "dialog");
      expect(switcherButton).toHaveAttribute("aria-expanded", expanded);
    },
  );

  it("should not render the currencies dialog when isCurrencySwitcherOpen is false", () => {
    mockSwitcherState(false);

    render(<CurrencySwitcher currencies={testCurrencies} />);

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("should render a button for each provided currency when isCurrencySwitcherOpen is true", () => {
    mockSwitcherState(true);

    render(<CurrencySwitcher currencies={testCurrencies} />);
    const dialog = screen.getByRole("dialog", { name: "Currencies" });

    expect(within(dialog).getAllByRole("button")).toHaveLength(
      testCurrencies.length,
    );
    expect(
      within(dialog).getByRole("button", { name: "$ USD" }),
    ).toBeInTheDocument();
    expect(
      within(dialog).getByRole("button", { name: "£ GBP" }),
    ).toBeInTheDocument();
  });

  it("should mark only the billing currency as pressed", () => {
    mockSwitcherState(true, "£");

    render(<CurrencySwitcher currencies={testCurrencies} />);

    expect(screen.getByRole("button", { name: "£ GBP" })).toHaveAttribute(
      "aria-pressed",
      "true",
    );
    expect(screen.getByRole("button", { name: "$ USD" })).toHaveAttribute(
      "aria-pressed",
      "false",
    );
  });

  it("should move focus to the billing currency option when opened", () => {
    mockSwitcherState(true, "£");

    render(<CurrencySwitcher currencies={testCurrencies} />);

    expect(screen.getByRole("button", { name: "£ GBP" })).toHaveFocus();
  });

  it("should return focus to the switcher button when closed", () => {
    mockSwitcherState(true);
    const { rerender } = render(
      <CurrencySwitcher currencies={testCurrencies} />,
    );

    mockSwitcherState(false);
    rerender(<CurrencySwitcher currencies={testCurrencies} />);

    expect(
      screen.getByRole("button", { name: "Currencies Pane" }),
    ).toHaveFocus();
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
    await userEvent.click(screen.getByRole("button", { name: "£ GBP" }));

    expect(dispatch).toHaveBeenCalledTimes(3);
    expect(dispatch).toHaveBeenCalledWith(currencySwitcherVisibToggle(false));
    expect(dispatch).toHaveBeenCalledWith(onCurrencyChange("£"));
    expect(dispatch).toHaveBeenCalledWith(backdropVisibilityToggle(false));
  });

  it("should close when Escape is pressed", async () => {
    mockSwitcherState(true);

    render(<CurrencySwitcher currencies={testCurrencies} />);
    await userEvent.keyboard("{Escape}");

    expect(dispatch).toHaveBeenCalledTimes(2);
    expect(dispatch).toHaveBeenCalledWith(currencySwitcherVisibToggle(false));
    expect(dispatch).toHaveBeenCalledWith(backdropVisibilityToggle(false));
  });

  it("should not react to Escape when isCurrencySwitcherOpen is false", async () => {
    mockSwitcherState(false);

    render(<CurrencySwitcher currencies={testCurrencies} />);
    await userEvent.keyboard("{Escape}");

    expect(dispatch).not.toHaveBeenCalled();
  });

  it("should have no accessibility violations on the whole page when open", async () => {
    mockSwitcherState(true);

    // The header gives the switcher button a landmark, as the toolbar does in
    // the app, so the full-page scan also covers axe's region rule.
    const { baseElement } = render(
      <header>
        <CurrencySwitcher currencies={testCurrencies} />
      </header>,
    );

    expect(await axe(baseElement)).toHaveNoViolations();
  });
});
