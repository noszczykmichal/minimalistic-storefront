import { render, screen } from "@testing-library/react";
import configureStore from "redux-mock-store";

import WithMockStoreAndRouter from "../../../utils/WithMockStoreAndRouter";
import CostSummary from "./CostSummary";
import { createTestStore } from "../../../utils/testUtils";

describe("CostSummary component", () => {
  it("should not initially render neither 'Other' nor 'Shipping' elements", () => {
    const customShippingPaymentOptions = {
      isFormValid: false,
      inputs: {
        shippingOption: {
          value: "",
          cost: 0,
          isSelected: false,
        },
        paymentOption: {
          value: "",
          cost: 0,
          isSelected: false,
        },
      },
    };

    const store = createTestStore(2, customShippingPaymentOptions);

    const { rerender } = render(
      <WithMockStoreAndRouter customStore={store}>
        <CostSummary />
      </WithMockStoreAndRouter>,
    );

    const shippingElement = screen.queryByText("Shipping:");
    const otherElement = screen.queryByText("Other:");

    expect(shippingElement).toBeNull();
    expect(otherElement).toBeNull();

    const updatedShippingPaymentOptions = {
      isFormValid: true,
      inputs: {
        shippingOption: {
          value: "bestWay",
          cost: 10,
          isSelected: true,
        },
        paymentOption: {
          value: "cash_on_collection",
          cost: 1.99,
          isSelected: true,
        },
      },
    };

    const updatedStore = createTestStore(2, updatedShippingPaymentOptions);

    rerender(
      <WithMockStoreAndRouter customStore={updatedStore}>
        <CostSummary />
      </WithMockStoreAndRouter>,
    );

    const shippingElAfterRerender = screen.getByText("Shipping:");
    const otherElAfterRerender = screen.getByText("Other:");

    expect(shippingElAfterRerender).toBeInTheDocument();
    expect(otherElAfterRerender).toBeInTheDocument();
  });

  it("should not show 'Other' in CostSummary component when payment method is for free", () => {
    const store = createTestStore();
    // initial render shouldn't find element
    const { rerender } = render(
      <WithMockStoreAndRouter customStore={store}>
        <CostSummary />
      </WithMockStoreAndRouter>,
    );

    const otherElement = screen.queryByText("Other:");
    expect(otherElement).toBeNull();

    const storeCopy = store.getState();
    const configuration = configureStore([]);

    const updatedStore = configuration({
      ...storeCopy,
      shippingPaymentOptions: {
        ...storeCopy.shippingPaymentOptions,
        inputs: {
          ...storeCopy.shippingPaymentOptions.inputs,
          paymentOption: {
            value: "cash_on_collection",
            cost: 1.99,
            isSelected: true,
          },
        },
      },
    });
    // secondary render after the store update
    rerender(
      <WithMockStoreAndRouter customStore={updatedStore}>
        <CostSummary />
      </WithMockStoreAndRouter>,
    );

    const otherElAfterRerender = screen.getByText("Other:");
    expect(otherElAfterRerender).toBeInTheDocument();
  });

  it("should render CostSummary component with correct values", () => {
    const store = createTestStore();

    const { products, shippingPaymentOptions } = store.getState();
    const { totalPrice, billingCurrency } = products;
    const { inputs } = shippingPaymentOptions;
    const { shippingOption } = inputs;
    const taxValue = billingCurrency + (totalPrice * 0.21).toFixed(2);
    const totalPriceValue = billingCurrency + totalPrice.toFixed(2);
    const shippingOptionValue =
      billingCurrency + shippingOption.cost.toFixed(2);

    render(
      <WithMockStoreAndRouter customStore={store}>
        <CostSummary />
      </WithMockStoreAndRouter>,
    );

    const taxValueElement = screen.getByText(taxValue);
    const totalPriceValueElement = screen.getByText(totalPriceValue);
    const shippingOptionValueElement = screen.getByText(shippingOptionValue);

    expect(taxValueElement).toBeInTheDocument();
    expect(totalPriceValueElement).toBeInTheDocument();
    expect(shippingOptionValueElement).toBeInTheDocument();
  });
});
