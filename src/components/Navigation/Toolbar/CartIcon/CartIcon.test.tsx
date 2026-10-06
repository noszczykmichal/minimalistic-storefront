vi.mock("@/hooks/useReduxHooks", () => ({
  useAppDispatch: vi.fn(),
  useAppSelector: vi.fn(),
}));
vi.mock("@/components/UI/Backdrop/Backdrop", () => ({
  default: ({
    isBackdropOpen,
    onClose,
  }: {
    isBackdropOpen: boolean;
    onClose: () => void;
  }) =>
    isBackdropOpen ? (
      <button type="button" onClick={onClose}>
        Close mini cart
      </button>
    ) : null,
}));

import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "vitest-axe";

import CartIcon from "@/components/Navigation/Toolbar/CartIcon/CartIcon";
import { useAppDispatch, useAppSelector } from "@/hooks/useReduxHooks";
import { uiActions } from "@/store/uiSlice";
import type { RootState } from "@/store/store";

const mockCartIconState = (productsTotal?: number, isMiniCartOpen = false) => {
  const state = {
    products: { productsTotal },
    ui: { isMiniCartOpen },
  } as unknown as RootState;

  vi.mocked(useAppSelector).mockImplementation((selector) => selector(state));
};

describe("CartIcon component", () => {
  const dispatch = vi.fn();
  const { miniCartVisibilityToggle, currencySwitcherVisibToggle } = uiActions;
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
  });

  it.each([
    [1, "Cart: 1 item"],
    [3, "Cart: 3 items"],
  ])(
    "should render an enabled button with a counter when productsTotal is %i",
    (productsTotal, expectedLabel) => {
      mockCartIconState(productsTotal);

      render(<CartIcon />);
      const cartIcon = screen.getByRole("button", { name: expectedLabel });

      expect(cartIcon).toBeEnabled();
      expect(cartIcon).toHaveTextContent(String(productsTotal));
    },
  );

  it.each([
    ["0", 0],
    ["undefined", undefined],
  ])(
    "should render a disabled button without a counter when productsTotal is %s",
    (_, productsTotal) => {
      mockCartIconState(productsTotal);

      render(<CartIcon />);
      const cartIcon = screen.getByRole("button", { name: "Cart: 0 items" });

      expect(cartIcon).toBeDisabled();
      expect(cartIcon).toHaveTextContent("");
    },
  );

  it("should open the mini cart and close the currency switcher on click", async () => {
    mockCartIconState(1);

    render(<CartIcon />);
    await userEvent.click(screen.getByRole("button", { name: "Cart: 1 item" }));

    expect(dispatch).toHaveBeenCalledTimes(2);
    expect(dispatch).toHaveBeenNthCalledWith(1, miniCartVisibilityToggle(true));
    expect(dispatch).toHaveBeenNthCalledWith(
      2,
      currencySwitcherVisibToggle(false),
    );
  });

  it("should render the backdrop into #modals-root when the mini cart is open", () => {
    mockCartIconState(1, true);

    render(<CartIcon />);

    expect(
      within(modalsRoot).getByRole("button", { name: "Close mini cart" }),
    ).toBeInTheDocument();
  });

  it("should not render the backdrop when the mini cart is closed", () => {
    mockCartIconState(1, false);

    render(<CartIcon />);

    expect(
      screen.queryByRole("button", { name: "Close mini cart" }),
    ).not.toBeInTheDocument();
  });

  it("should close the mini cart when the backdrop is clicked", async () => {
    mockCartIconState(1, true);

    render(<CartIcon />);
    await userEvent.click(
      screen.getByRole("button", { name: "Close mini cart" }),
    );

    expect(dispatch).toHaveBeenCalledTimes(1);
    expect(dispatch).toHaveBeenCalledWith(miniCartVisibilityToggle(false));
  });

  it("should not dispatch any actions when the cart is empty and the button is clicked", async () => {
    mockCartIconState(0);

    render(<CartIcon />);
    await userEvent.click(
      screen.getByRole("button", { name: "Cart: 0 items" }),
    );

    expect(dispatch).not.toHaveBeenCalled();
  });

  it.each([
    [false, "false"],
    [true, "true"],
  ])(
    "should expose the mini cart state via aria-expanded when isMiniCartOpen is %s",
    (isMiniCartOpen, expectedValue) => {
      mockCartIconState(1, isMiniCartOpen);

      render(<CartIcon />);
      const cartIcon = screen.getByRole("button", { name: "Cart: 1 item" });

      expect(cartIcon).toHaveAttribute("aria-expanded", expectedValue);
      expect(cartIcon).toHaveAttribute("aria-controls", "mini-cart");
    },
  );

  it("should move focus back to the button when the mini cart closes", () => {
    mockCartIconState(1, true);
    const { rerender } = render(<CartIcon />);
    const cartIcon = screen.getByRole("button", { name: "Cart: 1 item" });

    expect(cartIcon).not.toHaveFocus();

    mockCartIconState(1, false);
    rerender(<CartIcon />);

    expect(cartIcon).toHaveFocus();
  });

  it("should not take focus when it renders with the mini cart closed", () => {
    mockCartIconState(1, false);

    render(<CartIcon />);

    expect(
      screen.getByRole("button", { name: "Cart: 1 item" }),
    ).not.toHaveFocus();
  });

  it("should have no accessibility violations", async () => {
    mockCartIconState(2);

    const { container } = render(<CartIcon />);
    const result = await axe(container);

    expect(result).toHaveNoViolations();
  });
});
