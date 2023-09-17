import { render, screen } from "@testing-library/react";

import ThumbnailArrow from "./ThumbnailArrow";

describe("ThumbnailArrow component", () => {
  it("should render a left arrow when variant is 'left' and apply correct classes", () => {
    render(<ThumbnailArrow variant="left" />);
    const arrowElement = screen.getByRole("button");

    expect(arrowElement).toBeInTheDocument();
    expect(arrowElement).toHaveClass("button");
    expect(arrowElement).toHaveClass("button--left");
  });
  it("should render a right arrow when variant is 'right' and apply correct classes", () => {
    render(<ThumbnailArrow variant="right" />);
    const arrowElement = screen.getByRole("button");

    expect(arrowElement).toBeInTheDocument();
    expect(arrowElement).toHaveClass("button");
    expect(arrowElement).toHaveClass("button--right");
  });
});
