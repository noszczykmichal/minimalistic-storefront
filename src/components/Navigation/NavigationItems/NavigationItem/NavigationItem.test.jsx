/* eslint-disable import/first */
jest.mock("../../../../hooks/useReduxHooks.ts", () => ({
  useAppDispatch: jest.fn(),
}));

import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";

import NavigationItem from "./NavigationItem";
import { useAppDispatch } from "../../../../hooks/useReduxHooks";

describe("NavigationItem Component", () => {
  const testContent = "Test content";
  const testHref = "/some-link";
  const dispatch = jest.fn();
  useAppDispatch.mockReturnValue(dispatch);

  test("should render link with correct text and href attribute value", () => {
    render(
      <MemoryRouter>
        <NavigationItem link={testHref}>{testContent}</NavigationItem>
      </MemoryRouter>,
    );

    const linkElement = screen.getByText(testContent);

    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveAttribute("href", testHref);
  });

  test("should dispatch actions on Navlink click", () => {
    render(<NavigationItem link={testHref}>{testContent}</NavigationItem>);
  });
});
