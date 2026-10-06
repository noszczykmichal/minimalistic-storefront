import { render, screen, within } from "@testing-library/react";
import { axe } from "vitest-axe";

import Layout from "@/components/Layout/Layout";

vi.mock("@/components/Navigation/Toolbar/Toolbar", () => ({
  default: () => <header>Toolbar</header>,
}));
vi.mock("@/components/Navigation/MobileNavigation/MobileNavigation", () => ({
  default: () => <nav aria-label="Mobile">Mobile navigation</nav>,
}));
vi.mock("@/components/UI/Backdrop/Backdrop", () => ({
  default: () => <div>Backdrop</div>,
}));

describe("Layout component", () => {
  let modalsRoot: HTMLDivElement;

  beforeEach(() => {
    modalsRoot = document.createElement("div");
    modalsRoot.id = "modals-root";
    document.body.appendChild(modalsRoot);
  });

  afterEach(() => {
    modalsRoot.remove();
  });

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

  it("renders the backdrop into #modals-root", () => {
    render(
      <Layout>
        <p>Page content</p>
      </Layout>,
    );

    expect(within(modalsRoot).getByText("Backdrop")).toBeInTheDocument();
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
