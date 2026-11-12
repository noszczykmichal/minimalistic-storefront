import { screen, within } from "@testing-library/react";
import { axe } from "vitest-axe";

import OrderSummary from "@/components/OrderSummary/OrderSummary";
import {
  renderWithProviders,
  shippingOptions,
  paymentOptions,
  testItemDetails,
} from "@/utils/testUtils";
import productsSlice from "@/store/products/products";
import uiSlice from "@/store/ui/ui";

const renderOrderSummary = () => {
  return renderWithProviders(<OrderSummary />, {
    preloadedState: {
      products: {
        ...productsSlice.getInitialState(),
        cart: [testItemDetails],
        totalPrice: 518.47,
        billingCurrency: { label: "USD", symbol: "$" },
      },
      shippingAddressAndPayment: { draft: { shippingOption: "bestWay" } },
      ui: { ...uiSlice.getInitialState(), shippingOptions, paymentOptions },
    },
  });
};

describe("OrderSummary component", () => {
  it("should render the list of cart items", () => {
    renderOrderSummary();

    expect(
      screen.getByRole("heading", { level: 2, name: "Order Summary" }),
    ).toBeInTheDocument();
    const cartItems = within(screen.getByRole("list")).getAllByRole("listitem");
    expect(cartItems).toHaveLength(1);
    expect(
      screen.getByRole("img", { name: "Canada Goose Jacket" }),
    ).toBeInTheDocument();
  });

  it("should render the cost summary including the selected shipping", () => {
    renderOrderSummary();

    expect(screen.getByText("Shipping:")).toBeInTheDocument();
    expect(screen.getByText("$10.00")).toBeInTheDocument();
    expect(screen.getByText("$528.47")).toBeInTheDocument();
  });

  it("should have no accessibility violations", async () => {
    const { container } = renderOrderSummary();

    expect(await axe(container)).toHaveNoViolations();
  });
});
