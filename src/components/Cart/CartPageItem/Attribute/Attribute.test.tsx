import { render, screen } from "@testing-library/react";

import Attribute from "./Attribute";

describe("Attribute component", () => {
  it("should render h3 element and 2 buttons based on the provided data", () => {
    const testAttributeDetails = {
      name: "Capacity",
      items: [
        { displayValue: "521G", value: "512G" },
        { displayValue: "1T", value: "1T" },
      ],
    };

    render(<Attribute attributeDetails={testAttributeDetails} />);

    const regEx = new RegExp(`${testAttributeDetails.name}`);
    const h3Element = screen.getByText(regEx);
    const buttonElements = screen.getAllByRole("button");

    expect(h3Element).toBeInTheDocument();
    expect(buttonElements).toHaveLength(testAttributeDetails.items.length);
  });
});
