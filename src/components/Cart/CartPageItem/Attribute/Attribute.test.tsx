import { render, screen, within } from "@testing-library/react";
import { axe } from "vitest-axe";

import Attribute from "@/components/Cart/CartPageItem/Attribute/Attribute";

const sizeAttribute = {
  name: "Size",
  items: [
    { displayValue: "Small", value: "S", selected: true },
    { displayValue: "Medium", value: "M" },
  ],
};

// Text matches that a screen reader would actually reach.
const readableTextOptions = { ignore: "[aria-hidden='true'], script, style" };

describe("Attribute component", () => {
  it.each([false, true])(
    "should render no buttons when isInMiniView is %s",
    (isInMiniView) => {
      render(
        <Attribute
          attributeDetails={sizeAttribute}
          isInMiniView={isInMiniView}
        />,
      );

      expect(screen.queryByRole("button")).not.toBeInTheDocument();
    },
  );

  it("should expose the attribute name and only the selected value to screen readers", () => {
    render(<Attribute attributeDetails={sizeAttribute} isInMiniView={false} />);
    const definition = screen.getByRole("definition");

    expect(screen.getByRole("term")).toHaveTextContent("Size:");
    expect(
      within(definition).getByText("Small", readableTextOptions),
    ).toBeInTheDocument();
    expect(
      within(definition).queryByText("S", readableTextOptions),
    ).not.toBeInTheDocument();
    expect(
      within(definition).queryByText("M", readableTextOptions),
    ).not.toBeInTheDocument();
    expect(
      within(definition).queryByText("Medium", readableTextOptions),
    ).not.toBeInTheDocument();
  });

  it("should still show every variant as a visual chip", () => {
    render(<Attribute attributeDetails={sizeAttribute} isInMiniView={false} />);

    expect(screen.getByText("S")).toHaveAttribute("aria-hidden", "true");
    expect(screen.getByText("M")).toHaveAttribute("aria-hidden", "true");
  });

  it("should announce 'Not selected' when no variant is selected", () => {
    const attributeDetails = {
      name: "Capacity",
      items: [
        { displayValue: "512G", value: "512G" },
        { displayValue: "1T", value: "1T" },
      ],
    };

    render(<Attribute attributeDetails={attributeDetails} isInMiniView />);

    expect(
      within(screen.getByRole("definition")).getByText(
        "Not selected",
        readableTextOptions,
      ),
    ).toBeInTheDocument();
  });

  it("should have no accessibility violations", async () => {
    const { container } = render(
      <Attribute attributeDetails={sizeAttribute} isInMiniView />,
    );

    expect(await axe(container)).toHaveNoViolations();
  });
});
