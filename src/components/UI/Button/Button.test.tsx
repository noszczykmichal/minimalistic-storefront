import { ComponentProps } from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "vitest-axe";

import Button from "@/components/UI/Button/Button";

type ButtonProps = ComponentProps<typeof Button>;

const renderButton = (props: Partial<ButtonProps> = {}) =>
  render(
    <Button customClass="" {...props}>
      {props.children ?? "Click me"}
    </Button>,
  );

describe("Button component", () => {
  test("should render a button with text 'Click me'", () => {
    renderButton();

    const outputElement = screen.getByRole("button", { name: "Click me" });

    expect(outputElement).toBeInTheDocument();
  });

  test("should apply a specific class when customClass prop is non-empty string", () => {
    const testClass = "foo";
    renderButton({ customClass: testClass });

    const outputElement = screen.getByRole("button", { name: "Click me" });

    expect(outputElement).toHaveClass(testClass);
  });

  test("should render a button that is not disabled by default", () => {
    renderButton();

    const outputElement = screen.getByRole("button", { name: "Click me" });

    expect(outputElement).not.toBeDisabled();
  });

  test("should render a disabled button when isDisabled prop has value true", () => {
    renderButton({ isDisabled: true });

    const outputElement = screen.getByRole("button", { name: "Click me" });

    expect(outputElement).toBeDisabled();
  });

  test("should call clicked handler once when button is clicked", () => {
    const clickHandler = vi.fn();
    renderButton({ clicked: clickHandler });

    userEvent.click(screen.getByRole("button", { name: "Click me" }));

    expect(clickHandler).toHaveBeenCalledTimes(1);
    expect(clickHandler).toHaveBeenCalledWith(
      expect.objectContaining({ type: "click" }),
    );
  });

  test("should not call clicked handler when button is disabled", () => {
    const clickHandler = vi.fn();
    renderButton({ clicked: clickHandler, isDisabled: true });

    userEvent.click(screen.getByRole("button", { name: "Click me" }));

    expect(clickHandler).not.toHaveBeenCalled();
  });

  test("should not throw when clicked without a clicked handler", () => {
    renderButton();

    expect(() =>
      userEvent.click(screen.getByRole("button", { name: "Click me" })),
    ).not.toThrow();
  });

  test("should have no accessibility violations", async () => {
    const { container } = renderButton();

    const result = await axe(container);

    expect(result).toHaveNoViolations();
  });
});
