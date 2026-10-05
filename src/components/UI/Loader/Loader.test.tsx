import { render, screen } from "@testing-library/react";
import { axe } from "vitest-axe";

import Loader from "@/components/UI/Loader/Loader";

describe("Loader component", () => {
  test("should render a status element labelled 'Loading'", () => {
    render(<Loader />);

    expect(screen.getByRole("status", { name: "Loading" })).toBeInTheDocument();
  });

  test("should not have basic accessibility issues", async () => {
    const { container } = render(<Loader />);

    const results = await axe(container);

    expect(results).toHaveNoViolations();
  });
});
