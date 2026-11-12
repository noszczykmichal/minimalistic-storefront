vi.mock("@/hooks/useReduxHooks", () => ({
  useAppSelector: vi.fn(),
}));

import { render, screen } from "@testing-library/react";

import OrderSummaryItem from "@/components/OrderSummary/OrderSummaryList/OrderSummaryItem/OrderSummaryItem";
import { testItemDetails } from "@/utils/testUtils";
import { useAppSelector } from "@/hooks/useReduxHooks";
import type { RootState } from "@/store/store";
import type { Currency } from "@/types/types";

const mockBillingCurrency = (billingCurrency: Currency) => {
  const state = { products: { billingCurrency } } as unknown as RootState;
  vi.mocked(useAppSelector).mockImplementation((selector) => selector(state));
};

describe("OrderSummaryItem component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockBillingCurrency({ label: "USD", symbol: "$" });
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
    const currency: Currency = { label: "USD", symbol: "$" };

    const currentPrice = testItemDetails.prices
      .map((price) =>
        price.currency.symbol === currency.symbol
          ? price.amount.toFixed(2)
          : null,
      )
      .find((price) => price !== null);

    const priceTag = currency.symbol + currentPrice;

    const { rerender } = render(
      <OrderSummaryItem cartItem={testItemDetails} />,
    );

    const priceTagElement = screen.getByText(priceTag);

    expect(priceTagElement).toBeInTheDocument();

    const updatedCurrency: Currency = { label: "GBP", symbol: "£" };
    mockBillingCurrency(updatedCurrency);

    const updatedPrice = testItemDetails.prices
      .map((price) =>
        price.currency.symbol === updatedCurrency.symbol
          ? price.amount.toFixed(2)
          : null,
      )
      .find((price) => price !== null);

    rerender(<OrderSummaryItem cartItem={testItemDetails} />);
    const updatedPriceTag = updatedCurrency.symbol + updatedPrice;
    const updatedPriceTagElement = screen.getByText(updatedPriceTag);

    expect(updatedPriceTagElement).toBeInTheDocument();
  });
});
