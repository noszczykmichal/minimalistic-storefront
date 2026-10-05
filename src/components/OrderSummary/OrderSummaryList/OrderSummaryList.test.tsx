import { render, screen } from "@testing-library/react";
import { axe } from "vitest-axe";

import OrderSummaryList from "@/components/OrderSummary/OrderSummaryList/OrderSummaryList";
import WithMockStoreAndRouter from "@/utils/WithMockStoreAndRouter";
import { createTestStore } from "@/utils/testUtils";

const renderOrderSummaryList = (props: { headingLevel?: 1 | 2 } = {}) =>
  render(
    <WithMockStoreAndRouter customStore={createTestStore(2)}>
      <OrderSummaryList {...props} />
    </WithMockStoreAndRouter>,
  );

describe("OrderSummaryList component", () => {
  it("should render OrderSummaryList with heading and 2 list elements", async () => {
    renderOrderSummaryList();

    const headingElement = screen.getByRole("heading", {
      name: "Order Summary",
    });
    const orderSummaryElements = await screen.findAllByRole("listitem");

    expect(headingElement).toBeInTheDocument();
    expect(orderSummaryElements.length).toBe(2);
  });

  it("should render the title as a level 2 heading by default", () => {
    renderOrderSummaryList();

    expect(
      screen.getByRole("heading", { level: 2, name: "Order Summary" }),
    ).toBeInTheDocument();
  });

  it("should render the title as a level 1 heading when headingLevel is 1", () => {
    renderOrderSummaryList({ headingLevel: 1 });

    expect(
      screen.getByRole("heading", { level: 1, name: "Order Summary" }),
    ).toBeInTheDocument();
    expect(screen.queryByRole("heading", { level: 2 })).not.toBeInTheDocument();
  });

  it("should have no accessibility violations", async () => {
    const { container } = renderOrderSummaryList();

    expect(await axe(container)).toHaveNoViolations();
  });
});
