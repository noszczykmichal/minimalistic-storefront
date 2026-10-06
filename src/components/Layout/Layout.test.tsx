import { render, screen } from "@testing-library/react";
import { axe } from "vitest-axe";

import Layout from "@/components/Layout/Layout";

vi.mock("@/components/Navigation/Toolbar/Toolbar", () => ({
  default: () => <header>Toolbar</header>,
}));
vi.mock("@/components/Navigation/MobileNavigation/MobileNavigation", () => ({
  default: () => <nav aria-label="Mobile">Mobile navigation</nav>,
}));

describe("Layout component", () => {
  it("renders children inside the main landmark", () => {
    render(
      <Layout>
        <p>Page content</p>
      </Layout>,
    );

    expect(screen.getByRole("main")).toContainElement(
      screen.getByText("Page content"),
    );
  });

  it("should have no accessibility violations", async () => {
    const { container } = render(
      <Layout>
        <p>Page content</p>
      </Layout>,
    );

    expect(await axe(container)).toHaveNoViolations();
  });
});
