jest.mock("../../../../hooks/useReduxHooks.ts", () => ({
  useAppSelector: jest.fn(),
}));

import { render, screen } from "@testing-library/react";

import OrderSummaryItem from "./OrderSummaryItem";
import { testItemDetails } from "../../../../utils/testUtils";
import { useAppSelector } from "../../../../hooks/useReduxHooks";

describe("OrderSummaryItem component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    useAppSelector.mockReturnValue({ billingCurrency: "$" });
  });

  it("should render OrderSummaryItem with correct number of products", () => {
    const { brand, name, quantity } = testItemDetails;
    const quantityRegEx = new RegExp(`${quantity} x`);
    const productDescriptionRegEx = new RegExp(`${brand} ${name}`);

    render(<OrderSummaryItem cartItem={testItemDetails} />);

    const quantityElement = screen.getByText(quantityRegEx);
    const productDescriptElement = screen.getByText(productDescriptionRegEx);

    expect(quantityElement).toBeInTheDocument();
    expect(productDescriptElement).toBeInTheDocument();
  });

  it("should correctly update when the quantity of the product changes", () => {
    const { quantity } = testItemDetails;
    const quantityRegEx = new RegExp(`${quantity} x`);

    const { rerender } = render(
      <OrderSummaryItem cartItem={testItemDetails} />,
    );

    const quantityElement = screen.getByText(quantityRegEx);
    expect(quantityElement).toBeInTheDocument();

    const updatedItemDetails = { ...testItemDetails, quantity: 2 };
    const { quantity: updatedQuantity } = updatedItemDetails;
    const updatedQuantityRegEx = new RegExp(`${updatedQuantity} x`);
    rerender(<OrderSummaryItem cartItem={updatedItemDetails} />);

    const updatedQuantityElement = screen.getByText(updatedQuantityRegEx);

    expect(updatedQuantityElement).toBeInTheDocument();
  });

  it("should update price of the product when billingCurrency changes", () => {
    const currency = useAppSelector().billingCurrency;

    const currentPrice = testItemDetails.prices
      .map((price) =>
        price.currency.symbol === currency ? price.amount.toFixed(2) : null,
      )
      .find((price) => price !== null);

    const priceTag = currency + currentPrice;

    const { rerender } = render(
      <OrderSummaryItem cartItem={testItemDetails} />,
    );

    const priceTagElement = screen.getByText(priceTag);

    expect(priceTagElement).toBeInTheDocument();

    useAppSelector.mockReturnValue({ billingCurrency: "£" });
    const updatedCurrency = useAppSelector().billingCurrency;

    const updatedPrice = testItemDetails.prices
      .map((price) =>
        price.currency.symbol === updatedCurrency
          ? price.amount.toFixed(2)
          : null,
      )
      .find((price) => price !== null);

    rerender(<OrderSummaryItem cartItem={testItemDetails} />);
    const updatedPriceTag = updatedCurrency + updatedPrice;
    const updatedPriceTagElement = screen.getByText(updatedPriceTag);

    expect(updatedPriceTagElement).toBeInTheDocument();
  });
});
