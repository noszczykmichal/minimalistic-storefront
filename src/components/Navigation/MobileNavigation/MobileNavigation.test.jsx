jest.mock("../../../hooks/useReduxHooks.ts", () => ({
  useAppSelector: jest.fn(),
  useAppDispatch: jest.fn(),
}));

import { render, screen } from "@testing-library/react";
import { axe } from "jest-axe";
import { MemoryRouter } from "react-router";

import MobileNavigation from "./MobileNavigation";
import { useAppDispatch, useAppSelector } from "../../../hooks/useReduxHooks";

describe("MobileNavigation component", () => {
  const dispatch = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    useAppDispatch.mockReturnValue(dispatch);
    useAppSelector.mockReturnValue({
      categories: ["tech", "music"],
      isMobileNavOpen: true,
    });
  });

  it("should render a list of NavigationItems", () => {
    render(
      <MemoryRouter>
        <MobileNavigation />
      </MemoryRouter>,
    );

    const listEl = screen.getByRole("list");
    const listItems = screen.getAllByRole("listitem");
    const { categories } = useAppSelector.mock.results[0].value;

    expect(listEl).toBeInTheDocument();
    expect(listItems).toHaveLength(categories.length);
  });

  it("should have no accessibility violations", async () => {
    const { container } = render(
      <MemoryRouter>
        <MobileNavigation />
      </MemoryRouter>,
    );

    const result = await axe(container);
    expect(result).toHaveNoViolations();
  });
});
