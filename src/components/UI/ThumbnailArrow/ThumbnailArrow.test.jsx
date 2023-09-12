import { render, screen } from "@testing-library/react";

import ThumbnailArrow from "./ThumbnailArrow";

describe("ThumbnailArrow component", () => {
  it("should render a left arrow if variant is 'left' and apply correct classNames", () => {
    render(<ThumbnailArrow variant="left" />);
    const arrowElement = screen.getByRole("button");

    expect(arrowElement).toBeInTheDocument();
    expect(arrowElement).toHaveClass("button");
    expect(arrowElement).toHaveClass("button--left");
  });
  it("should render a right arrow if variant is 'right' and apply correct classNames", () => {
    render(<ThumbnailArrow variant="right" />);
    const arrowElement = screen.getByRole("button");

    expect(arrowElement).toBeInTheDocument();
    expect(arrowElement).toHaveClass("button");
    expect(arrowElement).toHaveClass("button--right");
  });
});
