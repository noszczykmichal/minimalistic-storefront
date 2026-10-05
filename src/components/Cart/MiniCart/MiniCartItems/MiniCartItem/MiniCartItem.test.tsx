vi.mock("@/hooks/useReduxHooks", () => ({
  useAppDispatch: vi.fn(),
  useAppSelector: vi.fn(),
}));

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "vitest-axe";

import MiniCartItem from "@/components/Cart/MiniCart/MiniCartItems/MiniCartItem/MiniCartItem";
import { testItemDetails } from "@/utils/testUtils";
import { useAppDispatch, useAppSelector } from "@/hooks/useReduxHooks";
import { productActions } from "@/store/productsSlice";

describe("MiniCartItem component", () => {
  const dispatch = vi.fn();
  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(useAppDispatch).mockReturnValue(dispatch);
    vi.mocked(useAppSelector).mockReturnValue({ billingCurrency: "$" });
  });

  it("should render MiniCartItem with accurate product description", () => {
    render(<MiniCartItem itemDetails={testItemDetails} />);

    const brandElement = screen.getByText(testItemDetails.brand);
    const nameElement = screen.getByText(testItemDetails.name);
    const priceElement = screen.getByText("$518.47");

    expect(brandElement).toBeInTheDocument();
    expect(nameElement).toBeInTheDocument();
    expect(priceElement).toBeInTheDocument();
  });

  it('should render "Attribute" with two variants', () => {
    const attributeName = `${testItemDetails.attributes[0].name}:`;
    const attributeVariantText = testItemDetails.attributes[0].items[0].value;
    const attributeVariantText2 = testItemDetails.attributes[0].items[1].value;

    render(<MiniCartItem itemDetails={testItemDetails} />);

    const attributeHeading = screen.getByRole("term");

    expect(attributeHeading).toHaveTextContent(attributeName);
    const attributeVariantEl = screen.getByText(attributeVariantText);
    const attributeVariantEl2 = screen.getByText(attributeVariantText2);

    expect(attributeHeading).toBeInTheDocument();
    expect(attributeVariantEl).toBeInTheDocument();
    expect(attributeVariantEl2).toBeInTheDocument();
  });

  it("should name the quantity buttons after the action and the product", () => {
    render(<MiniCartItem itemDetails={{ ...testItemDetails, quantity: 2 }} />);

    expect(
      screen.getByRole("button", {
        name: "Increase quantity of Canada Goose Jacket",
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", {
        name: "Decrease quantity of Canada Goose Jacket",
      }),
    ).toBeInTheDocument();
  });

  it("should label the '-' button as removal when quantity is 1", () => {
    render(<MiniCartItem itemDetails={{ ...testItemDetails, quantity: 1 }} />);

    expect(
      screen.getByRole("button", {
        name: "Remove Canada Goose Jacket from cart",
      }),
    ).toBeInTheDocument();
  });

  it.each([
    ["Increase quantity of Canada Goose Jacket", "addition"],
    ["Decrease quantity of Canada Goose Jacket", "subtraction"],
  ] as const)(
    "should dispatch changeQuantity when '%s' is clicked",
    async (buttonName, operationType) => {
      render(
        <MiniCartItem itemDetails={{ ...testItemDetails, quantity: 2 }} />,
      );

      await userEvent.click(screen.getByRole("button", { name: buttonName }));

      expect(dispatch).toHaveBeenCalledWith(
        productActions.changeQuantity({
          internalID: testItemDetails.internalID,
          operationType,
        }),
      );
    },
  );

  it("should announce the quantity with the product name in a live region", () => {
    render(<MiniCartItem itemDetails={{ ...testItemDetails, quantity: 3 }} />);

    const quantity = screen.getByText(
      (_, element) =>
        element?.tagName === "P" &&
        element.textContent === "Quantity of Canada Goose Jacket: 3",
    );

    expect(quantity).toHaveAttribute("aria-live", "polite");
    expect(quantity).toHaveAttribute("aria-atomic", "true");
  });

  it("should have no accessibility violations", async () => {
    const { container } = render(
      <ul>
        <MiniCartItem itemDetails={testItemDetails} />
      </ul>,
    );

    expect(await axe(container)).toHaveNoViolations();
  });
});
