/* eslint-disable import/first */

jest.mock("../../hooks/useReduxHooks.ts", () => ({
  useAppSelector: jest.fn(),
  useAppDispatch: jest.fn(),
}));

import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import Backdrop from "./Backdrop";
import WithMockStoreAndRouter from "../../../utils/WithMockStoreAndRouter";
import { useAppSelector, useAppDispatch } from "../../../hooks/useReduxHooks";
import { uiActions } from "../../../store/uiSlice";

describe("Backdrop component", () => {
  it("should not render the Backdrop if 'isBackdropOpen' is false", () => {
    useAppSelector.mockReturnValue({
      isBackdropTransparent: false,
      isBackdropOpen: false,
    });

    const { container } = render(
      <WithMockStoreAndRouter>
        <Backdrop />
      </WithMockStoreAndRouter>,
    );

    const backdrop = container.firstChild;

    expect(backdrop).not.toBeInTheDocument();
  });

  it("should render the Backdrop if 'isBackdropOpen' is true", () => {
    useAppSelector.mockReturnValue({
      isBackdropTransparent: false,
      isBackdropOpen: true,
    });

    const { container } = render(
      <WithMockStoreAndRouter>
        <Backdrop />
      </WithMockStoreAndRouter>,
    );

    const backdrop = container.firstChild;

    expect(backdrop).toBeInTheDocument();
  });

  it("should render the Backdrop only with the class 'backdrop' if 'isBackdropTransparent' is true", () => {
    useAppSelector.mockReturnValue({
      isBackdropTransparent: true,
      isBackdropOpen: true,
    });

    const { container } = render(
      <WithMockStoreAndRouter>
        <Backdrop />
      </WithMockStoreAndRouter>,
    );

    const backdrop = container.firstChild;

    expect(backdrop).toBeInTheDocument();
    expect(backdrop).toHaveClass("backdrop");
    expect(backdrop).not.toHaveClass("backdrop--grey");
  });
  it("should render the Backdrop with classes 'backdrop' and 'backdrop--grey' if 'isBackdropTransparent' is false", () => {
    useAppSelector.mockReturnValue({
      isBackdropTransparent: false,
      isBackdropOpen: true,
    });

    const { container } = render(
      <WithMockStoreAndRouter>
        <Backdrop />
      </WithMockStoreAndRouter>,
    );

    const backdrop = container.firstChild;

    expect(backdrop).toBeInTheDocument();
    expect(backdrop).toHaveClass("backdrop");
    expect(backdrop).toHaveClass("backdrop--grey");
  });

  it("should dispatch 5 actions on the Backdrop click", () => {
    useAppSelector.mockReturnValue({
      isBackdropTransparent: false,
      isBackdropOpen: true,
    });

    const dispatch = jest.fn();
    useAppDispatch.mockReturnValue(dispatch);
    const {
      currencySwitcherVisibToggle,
      backdropVisibilityToggle,
      miniCartVisibilityToggle,
      modalToggle,
      mobileNavVisibilityToggle,
    } = uiActions;

    const { container } = render(
      <WithMockStoreAndRouter>
        <Backdrop />
      </WithMockStoreAndRouter>,
    );

    const backdrop = container.firstElementChild;
    userEvent.click(backdrop);
    expect(dispatch).toBeCalledTimes(5);
    expect(dispatch).toBeCalledWith(currencySwitcherVisibToggle(false));
    expect(dispatch).toBeCalledWith(backdropVisibilityToggle(false));
    expect(dispatch).toBeCalledWith(miniCartVisibilityToggle(false));
    expect(dispatch).toBeCalledWith(modalToggle(false));
    expect(dispatch).toBeCalledWith(mobileNavVisibilityToggle(false));
  });
});
