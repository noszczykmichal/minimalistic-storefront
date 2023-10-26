jest.mock("../../../hooks/useReduxHooks.ts", () => ({
  useAppDispatch: jest.fn(),
  useAppSelector: jest.fn(),
}));

import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { testItemDetails } from "../../../utils/testUtils";
import CartPageItem from "./CartPageItem";
import { useAppDispatch, useAppSelector } from "../../../hooks/useReduxHooks";

describe("CartPageItem component", () => {
  const dispatch = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    useAppDispatch.mockReturnValue(dispatch);
    useAppSelector.mockReturnValue({ billingCurrency: "$" });
  });

  it("should render CartPageItem with accurate product description", () => {
    render(<CartPageItem itemDetails={testItemDetails} />);

    const brandRegEx = new RegExp(`${testItemDetails.brand}`);
    const nameRegEx = new RegExp(`${testItemDetails.name}`);
    const priceRegEx = /\$518.47/;

    const brandElement = screen.getByText(brandRegEx);
    const nameElement = screen.getByText(nameRegEx);
    const priceElement = screen.getByText(priceRegEx);

    expect(brandElement).toBeInTheDocument();
    expect(nameElement).toBeInTheDocument();
    expect(priceElement).toBeInTheDocument();
  });

  it('should render "Attribute" with two variants', () => {
    const attributeName = new RegExp(`${testItemDetails.name}`);
    const attributeVariantText = testItemDetails.attributes[0].items[0].value;
    const attributeVariantText2 = testItemDetails.attributes[0].items[1].value;

    render(<CartPageItem itemDetails={testItemDetails} />);

    const attributeHeading = screen.getByText(attributeName);
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

  it("should change currently displayed thumbnail to the next one when 'Next' button is clicked", () => {
    render(<CartPageItem itemDetails={testItemDetails} />);

    const [defaultImage, nextImage] = testItemDetails.gallery;

    const imageEl = screen.getByRole("img");
    expect(imageEl).toHaveAttribute("src", defaultImage);

    const nextButton = screen.getByLabelText(/Next/);
    userEvent.click(nextButton);

    expect(imageEl).toHaveAttribute("src", nextImage);
  });

  it("should change the first thumbnail from the gallery to the last one when the 'Previous' button is clicked", () => {
    const [defaultImage, , thirdImage] = testItemDetails.gallery;

    const { rerender } = render(<CartPageItem itemDetails={testItemDetails} />);
    const imgEl = screen.getByRole("img");

    expect(imgEl).toHaveAttribute("src", defaultImage);

    const previousButton = screen.getByLabelText(/Previous/);
    userEvent.click(previousButton);

    rerender(<CartPageItem itemDetails={testItemDetails} />);
    expect(imgEl).toHaveAttribute("src", thirdImage);
  });

  it("should display the first thumbnail when reaching the end of the gallery", () => {
    const [firstImage, , defaultImage] = testItemDetails.gallery;
    let mockedValue = 2;
    const setMockedValue = () => {
      mockedValue = 0;
    };

    const useStateMock = () => [mockedValue, setMockedValue];
    jest.spyOn(React, "useState").mockImplementation(useStateMock);

    const { rerender } = render(<CartPageItem itemDetails={testItemDetails} />);

    const imgEl = screen.getByRole("img");
    const nextButton = screen.getByLabelText(/Next/);

    expect(imgEl).toHaveAttribute("src", defaultImage);
    userEvent.click(nextButton);

    rerender(<CartPageItem itemDetails={testItemDetails} />);
    expect(imgEl).toHaveAttribute("src", firstImage);
  });
});
