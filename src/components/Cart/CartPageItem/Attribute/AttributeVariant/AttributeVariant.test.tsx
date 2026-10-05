import { render, screen } from "@testing-library/react";

import AttributeVariant from "@/components/Cart/CartPageItem/Attribute/AttributeVariant/AttributeVariant";
import { AttributeVariantInterface } from "@/types/types";

// Chips are aria-hidden and purely visual, so there is no role or label to
// query them by; these tests check the rendered element and its styling.
const setupChip = (
  variantType: string,
  variantData: AttributeVariantInterface,
  inMiniView = false,
) => {
  const { container } = render(
    <AttributeVariant
      variantType={variantType}
      variantData={variantData}
      inMiniView={inMiniView}
    />,
  );

  return container.firstChild as HTMLElement;
};

describe("AttributeVariant component", () => {
  it("should render a non-interactive chip hidden from screen readers", () => {
    const chip = setupChip("Size", { displayValue: "Large", value: "L" });

    expect(screen.queryByRole("button")).not.toBeInTheDocument();
    expect(chip.tagName).toBe("SPAN");
    expect(chip).toHaveAttribute("aria-hidden", "true");
  });

  it('should render an AttributeVariant of type "Color" that is not selected', () => {
    const chip = setupChip("Color", {
      displayValue: "Blue",
      value: "#030BFF",
    });

    expect(chip).toHaveClass("product-attribute__value--color");
    expect(chip).not.toHaveClass("product-attribute__value--color-selected");
    expect(chip).toHaveStyle({ backgroundColor: "rgb(3, 11, 255)" });
  });

  it('should render an AttributeVariant of type "Color" that is selected', () => {
    const chip = setupChip("Color", {
      displayValue: "Blue",
      value: "#030BFF",
      selected: true,
    });

    expect(chip).toHaveClass("product-attribute__value--color-selected");
  });

  it("should render white as light grey so the chip stays visible", () => {
    const chip = setupChip("Color", {
      displayValue: "White",
      value: "#FFFFFF",
    });

    expect(chip).toHaveStyle({ backgroundColor: "rgb(240, 240, 240)" });
  });

  it('should render an AttributeVariant of type "Size" that is not selected', () => {
    const chip = setupChip("Size", { displayValue: "Large", value: "L" });

    expect(chip).toHaveTextContent("L");
    expect(chip).toHaveClass("product-attribute__value");
    expect(chip).not.toHaveClass("product-attribute__value--selected");
  });

  it('should render an AttributeVariant of type "Size" that is selected', () => {
    const chip = setupChip("Size", {
      displayValue: "Large",
      value: "L",
      selected: true,
    });

    expect(chip).toHaveClass("product-attribute__value--selected");
  });

  it("should use the mini cart classes in mini view", () => {
    const chip = setupChip(
      "Size",
      { displayValue: "Large", value: "L", selected: true },
      true,
    );

    expect(chip).toHaveClass("product-attribute__value--mini-cart");
    expect(chip).toHaveClass("product-attribute__value--selected--mini-cart");
  });
});
