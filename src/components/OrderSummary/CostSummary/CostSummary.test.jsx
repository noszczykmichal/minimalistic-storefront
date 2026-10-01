import { render, screen } from "@testing-library/react";
import configureStore from "redux-mock-store";

import WithMockStoreAndRouter from "@/utils/WithMockStoreAndRouter";
import CostSummary from "@/components/OrderSummary/CostSummary/CostSummary";

const mockStore = configureStore([]);

const renderCostSummary = ({
  draft = {},
  billingCurrency = "$",
  totalPrice = 100,
} = {}) => {
  const store = mockStore({
    products: { billingCurrency, totalPrice },
    shippingAddressAndPayment: { draft },
  });

  return render(
    <WithMockStoreAndRouter customStore={store}>
      <CostSummary />
    </WithMockStoreAndRouter>,
  );
};

describe("CostSummary component", () => {
  it("should render tax, order total and total based on the cart price", () => {
    renderCostSummary();

    expect(screen.getByText("Tax 21%:")).toBeInTheDocument();
    expect(screen.getByText("$21.00")).toBeInTheDocument();
    expect(screen.getAllByText("$100.00")).toHaveLength(2);
  });

  it("should not render 'Shipping' or 'Other' when no options are selected", () => {
    renderCostSummary({ draft: { shippingOption: "", paymentMethod: "" } });

    expect(screen.queryByText("Shipping:")).not.toBeInTheDocument();
    expect(screen.queryByText("Other:")).not.toBeInTheDocument();
  });

  it("should not render 'Shipping' when the shipping option is null", () => {
    renderCostSummary({ draft: { shippingOption: null } });

    expect(screen.queryByText("Shipping:")).not.toBeInTheDocument();
  });

  it("should render the shipping price when a shipping option is selected", () => {
    renderCostSummary({ draft: { shippingOption: "bestWay" } });

    expect(screen.getByText("Shipping:")).toBeInTheDocument();
    expect(screen.getByText("$10.00")).toBeInTheDocument();
  });

  it("should render 'Shipping' for a free shipping option", () => {
    renderCostSummary({
      draft: { shippingOption: "in-store/online_payment" },
    });

    expect(screen.getByText("Shipping:")).toBeInTheDocument();
    expect(screen.getByText("$0.00")).toBeInTheDocument();
  });

  it("should render 'Other' when a paid payment method is selected", () => {
    renderCostSummary({ draft: { paymentMethod: "cash_on_collection" } });

    expect(screen.getByText("Other:")).toBeInTheDocument();
    expect(screen.getByText("$1.99")).toBeInTheDocument();
  });

  it("should not render 'Other' when a free payment method is selected", () => {
    renderCostSummary({ draft: { paymentMethod: "credit_card" } });

    expect(screen.queryByText("Other:")).not.toBeInTheDocument();
  });

  it("should include shipping and payment costs in the total", () => {
    renderCostSummary({
      draft: { shippingOption: "bestWay", paymentMethod: "cash_on_collection" },
    });

    expect(screen.getByText("$111.99")).toBeInTheDocument();
  });

  it("should use prices in the selected billing currency", () => {
    renderCostSummary({
      billingCurrency: "£",
      draft: { shippingOption: "bestWay", paymentMethod: "cash_on_collection" },
    });

    expect(screen.getByText("£7.19")).toBeInTheDocument();
    expect(screen.getByText("£1.49")).toBeInTheDocument();
    expect(screen.getByText("£108.68")).toBeInTheDocument();
  });
});
