jest.mock("../../../../../hooks/useReduxHooks.ts", () => ({
  useAppDispatch: jest.fn(),
  useAppSelector: jest.fn(),
}));

import { render, screen } from "@testing-library/react";

import MiniCartItem from "./MiniCartItem";
import { testItemDetails } from "../../../../../utils/testData";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../../../hooks/useReduxHooks";

jest.mock("../../../../../hooks/useChangeQuantity.ts");

describe("MiniCartItem component", () => {
  const dispatch = jest.fn();
  beforeEach(() => {
    jest.clearAllMocks();
    useAppDispatch.mockReturnValue(dispatch);
    useAppSelector.mockReturnValue({ billingCurrency: "$" });
  });

  it("should render MiniCartItem with accurate product description", () => {
    render(<MiniCartItem itemDetails={testItemDetails} />);

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

    render(<MiniCartItem itemDetails={testItemDetails} />);

    const attributeHeading = screen.getByText(attributeName);
    const attributeVariantEl = screen.getByText(attributeVariantText);
    const attributeVariantEl2 = screen.getByText(attributeVariantText2);

    expect(attributeHeading).toBeInTheDocument();
    expect(attributeVariantEl).toBeInTheDocument();
    expect(attributeVariantEl2).toBeInTheDocument();
  });
});
