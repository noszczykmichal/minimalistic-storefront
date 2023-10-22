import { render, screen } from "@testing-library/react";

import AttributeVariant from "./AttributeVariant";

describe("AttributeVariant component", () => {
  it('should render an AttributeVariant of type "Color" that is not selected', () => {
    const testData = {
      displayValue: "Blue",
      value: "#030BFF",
    };

    render(<AttributeVariant variantType="Color" variantData={testData} />);
    const button = screen.getByRole("button");

    expect(button).toBeInTheDocument();
    expect(button).toHaveClass("product-attribute__value--color");
    expect(button).not.toHaveClass("product-attribute__value--color-selected");
  });

  it('should render an AttributeVariant of type "Color" that is selected', () => {
    const testData = {
      displayValue: "Blue",
      value: "#030BFF",
      selected: true,
    };

    render(<AttributeVariant variantType="Color" variantData={testData} />);
    const button = screen.getByRole("button");

    expect(button).toBeInTheDocument();
    expect(button).toHaveClass("product-attribute__value--color-selected");
  });

  it('should render the AttributeVariant of background colour of rgb(240, 240, 240) if value is "white"', () => {
    const testData = {
      displayValue: "White",
      value: "#F0F0F0",
    };
    // #F0F0F0 translated to rgb
    const grey = "rgb(240, 240, 240)";

    render(<AttributeVariant variantType="Color" variantData={testData} />);
    const button = screen.getByRole("button");
    const style = window.getComputedStyle(button);

    expect(button).toBeInTheDocument();
    expect(style.backgroundColor).toBe(grey);
  });

  it('should render an AttributeVariant of type "Size" that is not selected', () => {
    const testData = {
      displayValue: "Large",
      value: "L",
    };

    render(<AttributeVariant variantType="Size" variantData={testData} />);
    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass("product-attribute__value");
    expect(button).not.toHaveClass("product-attribute__value--selected");
  });

  it('should render an AttributeVariant of type "Size" that is selected', () => {
    const testData = {
      displayValue: "Large",
      value: "L",
      selected: true,
    };

    render(<AttributeVariant variantType="Size" variantData={testData} />);
    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass("product-attribute__value--selected");
  });
});
