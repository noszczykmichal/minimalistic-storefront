vi.mock("@/hooks/useReduxHooks", () => ({
  useAppDispatch: vi.fn(),
  useAppSelector: vi.fn(),
}));

import { render, screen } from "@testing-library/react";
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
  const {
    backdropVisibilityToggle,
    backdropTypeToggle,
    miniCartVisibilityToggle,
    currencySwitcherVisibToggle,
  } = uiActions;

  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(useAppDispatch).mockReturnValue(dispatch);
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

    expect(dispatch).toHaveBeenCalledTimes(4);
    expect(dispatch).toHaveBeenNthCalledWith(1, backdropVisibilityToggle(true));
    expect(dispatch).toHaveBeenNthCalledWith(2, backdropTypeToggle(false));
    expect(dispatch).toHaveBeenNthCalledWith(3, miniCartVisibilityToggle(true));
    expect(dispatch).toHaveBeenNthCalledWith(
      4,
      currencySwitcherVisibToggle(false),
    );
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
