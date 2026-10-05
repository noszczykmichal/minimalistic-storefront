import { render, screen, within } from "@testing-library/react";
import { axe } from "vitest-axe";
import configureMockStore from "redux-mock-store";

import OrderSummary from "@/components/OrderSummary/OrderSummary";
import WithMockStoreAndRouter from "@/utils/WithMockStoreAndRouter";
import { testItemDetails } from "@/utils/testUtils";
import type { RootState } from "@/store/store";

const renderOrderSummary = () => {
  const state = {
    products: {
      cart: [testItemDetails],
      totalPrice: 518.47,
      billingCurrency: "$",
    },
    shippingAddressAndPayment: { draft: { shippingOption: "bestWay" } },
  } as unknown as RootState;

  return render(
    <WithMockStoreAndRouter customStore={configureMockStore([])(state)}>
      <OrderSummary />
    </WithMockStoreAndRouter>,
  );
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
