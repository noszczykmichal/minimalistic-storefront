import { render, screen } from "@testing-library/react";

import OrderSummaryList from "./OrderSummaryList";
import WithMockStoreAndRouter from "../../../utils/WithMockStoreAndRouter";
import { createTestStore } from "../../../utils/testUtils";

describe("OrderSummaryList component", () => {
  it("should render OrderSummaryList with heading and 2 list elements", async () => {
    const customStore = createTestStore(2);

    render(
      <WithMockStoreAndRouter customStore={customStore}>
        <OrderSummaryList />
      </WithMockStoreAndRouter>,
    );

    const headingElement = screen.getByText("Order Summary");
    const orderSummaryElements = await screen.findAllByRole("listitem");

    expect(headingElement).toBeInTheDocument();
    expect(orderSummaryElements.length).toBe(2);
  });
});
