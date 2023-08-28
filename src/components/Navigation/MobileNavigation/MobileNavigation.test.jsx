/* eslint-disable import/first */
jest.mock("../../../hooks/useReduxHooks.ts", () => ({
  useAppSelector: jest.fn(),
  useAppDispatch: jest.fn(),
}));

import { render } from "@testing-library/react";
import { axe } from "jest-axe";
import WithMockStoreAndRouter from "../../../utils/WithMockStoreAndRouter";

import MobileNavigation from "./MobileNavigation";
import { useAppDispatch, useAppSelector } from "../../../hooks/useReduxHooks";

describe("MobileNavigation component", () => {
  const dispatch = jest.fn();

  it("should have no accessibility violations", async () => {
    useAppDispatch(dispatch);
    useAppSelector.mockReturnValue({
      categories: ["tech", "music"],
      isMobileNavOpen: true,
    });

    const { container } = render(
      <WithMockStoreAndRouter>
        <MobileNavigation />
      </WithMockStoreAndRouter>,
    );

    const result = await axe(container);
    expect(result).toHaveNoViolations();
  });
});
