import { render, screen } from "@testing-library/react";

import Button from "./Button";

describe("Button component", () => {
  test("should render a button with text 'Click me'", () => {
    const testText = "Click me";
    render(<Button>{testText}</Button>);

    const outputElement = screen.getByText(testText);

    expect(outputElement).toBeInTheDocument();
  });

  test("should apply a specific class when customClass prop is non-empty string", () => {
    const testClass = "foo";
    render(<Button customClass={testClass} />);

    const outputElement = screen.getByRole("button");
    expect(outputElement).toHaveClass(testClass);
  });

  test("should render a button that is not disabled by default", () => {
    render(<Button />);

    const outputElement = screen.getByRole("button");

    expect(outputElement).not.toBeDisabled();
  });

  test("should render a disabled button when isDisabled prop has value true", () => {
    render(<Button isDisabled />);

    const outputElement = screen.getByRole("button");

    expect(outputElement).toBeDisabled();
  });
});
