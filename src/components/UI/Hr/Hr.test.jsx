import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import Hr from "./Hr";

test("should render an empty div element with class 'hr'", () => {
  const { container } = render(<Hr />);

  const hrElement = container.querySelector("div");

  expect(hrElement).toBeInTheDocument();
  expect(hrElement).toBeEmptyDOMElement();
  expect(hrElement).toHaveClass("hr");
});

test("should apply specific class when customClass prop is non-empty string", () => {
  const testClass = "test-class";
  const { container } = render(<Hr customClass={testClass} />);

  const hrElement = container.firstChild;

  expect(hrElement).toHaveClass("hr");
  expect(hrElement).toHaveClass(testClass);
});
