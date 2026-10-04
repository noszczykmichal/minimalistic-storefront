vi.mock("@/hooks/useReduxHooks", async (importActual) => {
  const actual = await importActual<typeof import("@/hooks/useReduxHooks")>();
  return { ...actual, useAppDispatch: vi.fn() };
});
vi.mock("@/hooks/useRedirect", () => ({ default: vi.fn() }));
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "vitest-axe";
import configureMockStore from "redux-mock-store";

import { useAppDispatch } from "@/hooks/useReduxHooks";
import useRedirect from "@/hooks/useRedirect";
import { createTestStore } from "@/utils/testUtils";
import MiniCart from "@/components/Cart/MiniCart/MiniCart";
import WithMockStoreAndRouter from "@/utils/WithMockStoreAndRouter";

const createEmptyCartStore = (isMiniCartOpen: boolean, totalPrice = 0) =>
  configureMockStore([])({
    ui: { isMiniCartOpen },
    products: { cart: [], productsTotal: 0, totalPrice, billingCurrency: "$" },
  });

const renderMiniCart = (store = createTestStore()) =>
  render(
    <WithMockStoreAndRouter customStore={store}>
      <MiniCart />
    </WithMockStoreAndRouter>,
  );

describe("MiniCart component", () => {
  const dispatch = vi.fn();
  const redirect = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();

    vi.mocked(useAppDispatch).mockReturnValue(dispatch);
    vi.mocked(useRedirect).mockReturnValue(redirect);
  });

  it.each([
    [1, "My Bag, 1 item"],
    [2, "My Bag, 2 items"],
  ])(
    "should render a heading with the item count when productsTotal is %i",
    (productsTotal, expectedHeading) => {
      renderMiniCart(createTestStore(productsTotal));

      expect(
        screen.getByRole("heading", { name: expectedHeading }),
      ).toBeInTheDocument();
    },
  );

  it("should render a dialog labelled by its heading and move focus into it", () => {
    renderMiniCart(createTestStore(2));

    const dialog = screen.getByRole("dialog", { name: "My Bag, 2 items" });

    expect(dialog).toHaveFocus();
  });

  it("should render the total price in the billing currency with 2 decimals", () => {
    renderMiniCart(createEmptyCartStore(true, 12.5));

    expect(screen.getByRole("term")).toHaveTextContent("Total");
    expect(screen.getByRole("definition")).toHaveTextContent("$12.50");
  });

  it("should close without redirecting when Escape is pressed", async () => {
    renderMiniCart();

    await userEvent.keyboard("{Escape}");

    expect(redirect).toHaveBeenCalledTimes(1);
    expect(redirect).toHaveBeenCalledWith();
  });

  it("should ignore other keys", async () => {
    renderMiniCart();

    await userEvent.keyboard("{Enter}a");

    expect(redirect).not.toHaveBeenCalled();
  });

  it("should redirect to the cart page when 'View Bag' is clicked", async () => {
    renderMiniCart();

    await userEvent.click(screen.getByRole("button", { name: "View Bag" }));

    expect(redirect).toHaveBeenCalledTimes(1);
    expect(redirect).toHaveBeenCalledWith("/cart");
  });

  it("should redirect to the shipping form when 'Check out' is clicked", async () => {
    renderMiniCart();

    await userEvent.click(screen.getByRole("button", { name: "Check out" }));

    expect(redirect).toHaveBeenCalledTimes(1);
    expect(redirect).toHaveBeenCalledWith("/cart/shipping/address&payment");
  });

  it("should render nothing when isMiniCartOpen is false", () => {
    renderMiniCart(createEmptyCartStore(false));

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    expect(screen.queryByRole("heading")).not.toBeInTheDocument();
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });

  it("should not react to Escape when isMiniCartOpen is false", async () => {
    renderMiniCart(createEmptyCartStore(false));

    await userEvent.keyboard("{Escape}");

    expect(redirect).not.toHaveBeenCalled();
  });

  it("should have no accessibility violations", async () => {
    const { container } = renderMiniCart();

    expect(await axe(container)).toHaveNoViolations();
  });
});
