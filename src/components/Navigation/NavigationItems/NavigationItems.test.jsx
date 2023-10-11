import { render, screen } from "@testing-library/react";

import NavigationItems from "./NavigationItems";
import WithMockStoreAndRouter from "../../../utils/WithMockStoreAndRouter";

describe("NavigationItems component", () => {
  const testCategories = ["all", "tech"];

  it("should render a list of link elements if a non-empty array is passed", () => {
    render(
      <WithMockStoreAndRouter>
        <NavigationItems categories={testCategories} />
      </WithMockStoreAndRouter>,
    );
    const listElement = screen.getByRole("list");
    const items = screen.getAllByRole("listitem");

    expect(listElement).toBeInTheDocument();
    expect(items).toHaveLength(testCategories.length);
  });

  it("should render a link to '/'(homepage) if encounters 'all' element in array passed through categories prop", () => {
    render(
      <WithMockStoreAndRouter>
        <NavigationItems categories={testCategories} />
      </WithMockStoreAndRouter>,
    );
    const linkElement = screen.getByText("all");

    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveAttribute("href", "/");
  });
});
