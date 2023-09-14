import { render, screen } from "@testing-library/react";

import ErrorModal from "./ErrorModal";

describe("ErrorModal component", () => {
  it("render a provided error message", () => {
    const testErrorObj = {
      message: "test message",
    };

    render(<ErrorModal errorDetails={testErrorObj} />);

    const outputElement = screen.getByText(testErrorObj.message, {
      exact: false,
    });

    expect(outputElement).toBeInTheDocument();
  });
});
