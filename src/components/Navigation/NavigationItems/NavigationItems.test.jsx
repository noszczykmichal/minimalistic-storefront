import { render, screen } from "@testing-library/react";

import NavigationItems from "./NavigationItems";
import WithMockStoreAndRouter from "../../../utils/WithMockStoreAndRouter";

describe("NavigationItems component", () => {
  it("should render a list of link elements if a non-empty array is passed", () => {
    const testCategories = ["testString", "testString2"];

    render(
      <WithMockStoreAndRouter>
        <NavigationItems categories={testCategories} />
      </WithMockStoreAndRouter>,
    );

    const ulElement = screen.getByRole("list");
    const listElement = screen.getByText(testCategories[0]);

    expect(ulElement).toBeInTheDocument();
    expect(listElement).toBeInTheDocument();
  });

  it("should render a link to '/'(homepage) if encounters 'all' element in array passed through categories prop", () => {
    const testCategories = ["all"];

    render(
      <WithMockStoreAndRouter>
        <NavigationItems categories={testCategories} />
      </WithMockStoreAndRouter>,
    );

    const linkElement = screen.getByRole("link");

    expect(linkElement.textContent).toBe("all");
    expect(linkElement).toHaveAttribute("href", "/");
  });
});