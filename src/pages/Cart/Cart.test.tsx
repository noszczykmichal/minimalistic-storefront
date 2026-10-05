vi.mock("@/hooks/useRedirect", () => ({ default: vi.fn() }));

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "vitest-axe";
import { legacy_configureStore as configureMockStore } from "redux-mock-store";

import Cart from "@/pages/Cart/Cart";
import useRedirect from "@/hooks/useRedirect";
import WithMockStoreAndRouter from "@/utils/WithMockStoreAndRouter";
import { createTestStore, testItemDetails } from "@/utils/testUtils";

const createEmptyCartStore = () =>
  configureMockStore([])({
    products: {
      cart: [],
      productsTotal: 0,
      totalPrice: 0,
      billingCurrency: "$",
    },
  });

const renderCart = (store = createTestStore()) =>
  render(
    <WithMockStoreAndRouter customStore={store}>
      <Cart />
    </WithMockStoreAndRouter>,
  );

describe("Cart page", () => {
  const redirect = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(useRedirect).mockReturnValue(redirect);
  });

  it("should render a 'Cart' heading", () => {
    renderCart();

    expect(
      screen.getByRole("heading", { level: 1, name: "Cart" }),
    ).toBeInTheDocument();
  });

  it("should render every item in the cart", () => {
    renderCart();

    expect(
      screen.getAllByRole("button", { name: /^Increase quantity of/ }),
    ).toHaveLength(2);
    expect(screen.getByText("Canada Goose")).toBeInTheDocument();
    expect(screen.getByText("Nike x Stussy")).toBeInTheDocument();
  });

  it("should render the tax, quantity and total based on the cart", () => {
    renderCart(
      configureMockStore([])({
        products: {
          cart: [{ ...testItemDetails, quantity: 2 }],
          productsTotal: 2,
          totalPrice: 1036.94,
          billingCurrency: "$",
        },
      }),
    );

    expect(screen.getByText("Tax 21%:")).toBeInTheDocument();
    expect(screen.getByText("$217.76")).toBeInTheDocument();
    expect(screen.getByText("Quantity:")).toBeInTheDocument();
    // "2" is shown by the item's quantity counter and by the summary.
    expect(screen.getAllByText("2")).toHaveLength(2);
    expect(screen.getByText("Total:")).toBeInTheDocument();
    expect(screen.getByText("$1036.94")).toBeInTheDocument();
  });

  it("should render no items and zero totals when the cart is empty", () => {
    renderCart(createEmptyCartStore());

    expect(
      screen.queryByRole("button", { name: /^Increase quantity of/ }),
    ).not.toBeInTheDocument();
    expect(screen.getAllByText("$0.00")).toHaveLength(2);
    expect(screen.getByText("0")).toBeInTheDocument();
  });

  it("should redirect to the shipping form when 'Order' is clicked", async () => {
    renderCart();

    await userEvent.click(screen.getByRole("button", { name: "Order" }));

    expect(redirect).toHaveBeenCalledTimes(1);
    expect(redirect).toHaveBeenCalledWith("/cart/shipping/address&payment");
  });

  it("should have no accessibility violations", async () => {
    const { container } = renderCart();

    expect(await axe(container)).toHaveNoViolations();
  });
});
