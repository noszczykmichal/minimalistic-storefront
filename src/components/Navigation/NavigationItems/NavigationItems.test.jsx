import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import { MemoryRouter } from "react-router";

import NavigationItems from "./NavigationItems";

const mockStore = configureMockStore();

describe("NavigationItems component", () => {
  it("should render a list of link elements if a non-empty array is passed", () => {
    const testCategories = ["testString", "testString2"];
    const store = mockStore({});

    render(
      <Provider store={store}>
        <MemoryRouter>
          <NavigationItems categories={testCategories} />
        </MemoryRouter>
      </Provider>,
    );

    const ulElement = screen.getByRole("list");

    expect(ulElement).toBeInTheDocument();
    expect(ulElement.children.length).toBe(testCategories.length);
  });

  it("should render a link to '/'(homepage) if encounters 'all' element in array passed through categories prop", () => {
    const testCategories = ["all"];
    const store = mockStore({});

    render(
      <Provider store={store}>
        <MemoryRouter>
          <NavigationItems categories={testCategories} />
        </MemoryRouter>
      </Provider>,
    );

    const linkElement = screen.getByRole("link");

    expect(linkElement.textContent).toBe("all");
    expect(linkElement).toHaveAttribute("href", "/");
  });
});
