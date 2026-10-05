vi.mock("@/hooks/useReduxHooks", () => ({
  useAppDispatch: vi.fn(),
  useAppSelector: vi.fn(),
}));

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "vitest-axe";

import { testItemDetails } from "@/utils/testUtils";
import CartPageItem from "@/components/Cart/CartPageItem/CartPageItem";
import { useAppDispatch, useAppSelector } from "@/hooks/useReduxHooks";
import { productActions } from "@/store/products";

describe("CartPageItem component", () => {
  const dispatch = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(useAppDispatch).mockReturnValue(dispatch);
    vi.mocked(useAppSelector).mockReturnValue({ billingCurrency: "$" });
  });

  it("should render CartPageItem with accurate product description", () => {
    render(<CartPageItem itemDetails={testItemDetails} />);

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

    render(<CartPageItem itemDetails={testItemDetails} />);

    const attributeHeading = screen.getByRole("term");

    expect(attributeHeading).toHaveTextContent(attributeName);
    const attributeVariantEl = screen.getByText(attributeVariantText);
    const attributeVariantEl2 = screen.getByText(attributeVariantText2);

    expect(attributeHeading).toBeInTheDocument();
    expect(attributeVariantEl).toBeInTheDocument();
    expect(attributeVariantEl2).toBeInTheDocument();
  });

  it("should render thumbnail arrows when gallery length is greater than one", () => {
    render(<CartPageItem itemDetails={testItemDetails} />);

    const leftArrow = screen.getByLabelText(/Previous/);
    const rightArrow = screen.getByLabelText(/Next/);

    expect(leftArrow).toBeInTheDocument();
    expect(rightArrow).toBeInTheDocument();
  });

  it("should not render thumbnail arrows when gallery length equals one", () => {
    const testSpecificDetails = {
      ...testItemDetails,
      gallery: [
        "https://images.canadagoose.com/image/upload/w_480,c_scale,f_auto,q_auto:best/v1576016105/product-image/2409L_61.jpg",
      ],
    };

    render(<CartPageItem itemDetails={testSpecificDetails} />);

    const leftArrow = screen.queryByLabelText(/Previous/);
    const rightArrow = screen.queryByLabelText(/Next/);

    expect(leftArrow).toBeNull();
    expect(rightArrow).toBeNull();
  });

  it("should change currently displayed thumbnail to the next one when 'Next' button is clicked", async () => {
    render(<CartPageItem itemDetails={testItemDetails} />);

    const [defaultImage, nextImage] = testItemDetails.gallery;

    const imageEl = screen.getByRole("img");
    expect(imageEl).toHaveAttribute("src", defaultImage);

    const nextButton = screen.getByLabelText(/Next/);
    await userEvent.click(nextButton);

    expect(imageEl).toHaveAttribute("src", nextImage);
  });

  it("should change the first thumbnail from the gallery to the last one when the 'Previous' button is clicked", async () => {
    const [defaultImage, , thirdImage] = testItemDetails.gallery;

    const { rerender } = render(<CartPageItem itemDetails={testItemDetails} />);
    const imgEl = screen.getByRole("img");

    expect(imgEl).toHaveAttribute("src", defaultImage);

    const previousButton = screen.getByLabelText(/Previous/);
    await userEvent.click(previousButton);

    rerender(<CartPageItem itemDetails={testItemDetails} />);
    expect(imgEl).toHaveAttribute("src", thirdImage);
  });

  it("should display the first thumbnail when reaching the end of the gallery", async () => {
    render(<CartPageItem itemDetails={testItemDetails} />);

    const [firstImage, secondImage, thirdImage] = testItemDetails.gallery;
    const imgEl = screen.getByRole("img");
    const nextButton = screen.getByLabelText(/Next/);

    expect(imgEl).toHaveAttribute("src", firstImage);

    await userEvent.click(nextButton);
    expect(imgEl).toHaveAttribute("src", secondImage);

    await userEvent.click(nextButton);
    expect(imgEl).toHaveAttribute("src", thirdImage);

    await userEvent.click(nextButton);
    expect(imgEl).toHaveAttribute("src", firstImage);
  });

  it("should name the quantity buttons after the action and the product", () => {
    render(<CartPageItem itemDetails={{ ...testItemDetails, quantity: 2 }} />);

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
    render(<CartPageItem itemDetails={{ ...testItemDetails, quantity: 1 }} />);

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
        <CartPageItem itemDetails={{ ...testItemDetails, quantity: 2 }} />,
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
    render(<CartPageItem itemDetails={{ ...testItemDetails, quantity: 3 }} />);

    const quantity = screen.getByText(
      (_, element) =>
        element?.tagName === "P" &&
        element.textContent === "Quantity of Canada Goose Jacket: 3",
    );

    expect(quantity).toHaveAttribute("aria-live", "polite");
    expect(quantity).toHaveAttribute("aria-atomic", "true");
  });

  it("should have no accessibility violations inside a list", async () => {
    const { container } = render(
      <ul>
        <CartPageItem itemDetails={testItemDetails} />
      </ul>,
    );

    expect(await axe(container)).toHaveNoViolations();
  });
});
