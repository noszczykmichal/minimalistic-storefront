jest.mock("../../../hooks/useReduxHooks.ts", () => ({
  useAppSelector: jest.fn(),
  useAppDispatch: jest.fn(),
}));

import { render } from "@testing-library/react";
import { axe } from "jest-axe";
import { MemoryRouter } from "react-router";

import MobileNavigation from "./MobileNavigation";
import { useAppDispatch, useAppSelector } from "../../../hooks/useReduxHooks";

describe("MobileNavigation component", () => {
  const dispatch = jest.fn();

  it("should have no accessibility violations", async () => {
    useAppDispatch.mockReturnValue(dispatch);
    useAppSelector.mockReturnValue({
      categories: ["tech", "music"],
      isMobileNavOpen: true,
    });

    const { container } = render(
      <MemoryRouter>
        <MobileNavigation />
      </MemoryRouter>,
    );

    const result = await axe(container);
    expect(result).toHaveNoViolations();
  });
});
