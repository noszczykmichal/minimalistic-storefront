/* eslint-disable import/first */
jest.mock("../../../../hooks/useReduxHooks.ts", () => ({
  useAppDispatch: jest.fn(),
}));

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router";

import NavigationItem from "./NavigationItem";
import { useAppDispatch } from "../../../../hooks/useReduxHooks";
import { uiActions } from "../../../../store/uiSlice";

describe("NavigationItem component", () => {
  const dispatch = jest.fn();

  test("should render a link with correct text and href attribute value", () => {
    const testContent = "Test content";
    const testHref = "/some-link";
    useAppDispatch.mockReturnValue(dispatch);

    render(
      <MemoryRouter>
        <NavigationItem link={testHref}>{testContent}</NavigationItem>
      </MemoryRouter>,
    );

    const linkElement = screen.getByText(testContent);
    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveAttribute("href", testHref);
  });

  test("should dispatch 4 actions on a Navlink click", () => {
    useAppDispatch.mockReturnValue(dispatch);
    const {
      backdropVisibilityToggle,
      currencySwitcherVisibToggle,
      miniCartVisibilityToggle,
      mobileNavVisibilityToggle,
    } = uiActions;

    render(
      <MemoryRouter>
        <NavigationItem />
      </MemoryRouter>,
    );

    const linkElement = screen.getByRole("link");
    userEvent.click(linkElement);

    expect(dispatch).toHaveBeenCalledTimes(4);
    expect(dispatch).toHaveBeenCalledWith(backdropVisibilityToggle(false));
    expect(dispatch).toHaveBeenCalledWith(currencySwitcherVisibToggle(false));
    expect(dispatch).toHaveBeenCalledWith(miniCartVisibilityToggle(false));
    expect(dispatch).toHaveBeenCalledWith(mobileNavVisibilityToggle(false));
  });
});
