import { act, render, screen } from "@testing-library/react";
import { axe } from "vitest-axe";

import ShoppingBagIcon from "@/components/UI/ShoppingBagIcon/ShoppingBagIcon";

describe("ShoppingBagIcon component", () => {
  test("should render the shopping bag icon", () => {
    render(<ShoppingBagIcon animateCheckmark={false} />);

    expect(screen.getByTestId("shopping-bag-icon")).toBeInTheDocument();
  });

  test("should not render the checkmark when animateCheckmark is false", () => {
    render(<ShoppingBagIcon animateCheckmark={false} />);

    expect(screen.queryByTestId("checkmark")).not.toBeInTheDocument();
  });

  test("should render the checkmark when animateCheckmark is true", () => {
    render(<ShoppingBagIcon animateCheckmark />);

    expect(screen.getByTestId("checkmark")).toBeInTheDocument();
  });

  test("should fade in the checkmark when animateCheckmark changes to true", () => {
    vi.useFakeTimers();
    const { rerender } = render(<ShoppingBagIcon animateCheckmark={false} />);

    rerender(<ShoppingBagIcon animateCheckmark />);
    const checkmark = screen.getByTestId("checkmark");

    expect(checkmark).not.toHaveClass("fadeIn-enter-done");

    act(() => {
      vi.advanceTimersByTime(300);
    });

    expect(checkmark).toHaveClass("fadeIn-enter-done");
    vi.useRealTimers();
  });

  test("should not have basic accessibility issues", async () => {
    const { container } = render(<ShoppingBagIcon animateCheckmark />);

    const results = await axe(container);

    expect(results).toHaveNoViolations();
  });
});
