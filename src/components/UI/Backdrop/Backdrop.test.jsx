jest.mock("../../../hooks/useReduxHooks.ts", () => ({
  useAppSelector: jest.fn(),
  useAppDispatch: jest.fn(),
}));

import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import Backdrop from "./Backdrop";
import { useAppSelector, useAppDispatch } from "../../../hooks/useReduxHooks";
import { uiActions } from "../../../store/uiSlice";

describe("Backdrop component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should not render Backdrop when 'isBackdropOpen' is false", () => {
    useAppSelector.mockReturnValue({
      isBackdropTransparent: false,
      isBackdropOpen: false,
    });

    const { container } = render(<Backdrop />);
    const backdrop = container.firstChild;

    expect(backdrop).not.toBeInTheDocument();
  });

  it("should render Backdrop when 'isBackdropOpen' is true", () => {
    useAppSelector.mockReturnValue({
      isBackdropTransparent: false,
      isBackdropOpen: true,
    });

    const { container } = render(<Backdrop />);
    const backdrop = container.firstChild;

    expect(backdrop).toBeInTheDocument();
  });

  it("should render Backdrop with the class 'backdrop' when 'isBackdropTransparent' is true", () => {
    useAppSelector.mockReturnValue({
      isBackdropTransparent: true,
      isBackdropOpen: true,
    });

    const { container } = render(<Backdrop />);
    const backdrop = container.firstChild;

    expect(backdrop).toBeInTheDocument();
    expect(backdrop).toHaveClass("backdrop");
    expect(backdrop).not.toHaveClass("backdrop--grey");
  });
  it("should render Backdrop with classes 'backdrop' and 'backdrop--grey' when 'isBackdropTransparent' is false", () => {
    useAppSelector.mockReturnValue({
      isBackdropTransparent: false,
      isBackdropOpen: true,
    });

    const { container } = render(<Backdrop />);
    const backdrop = container.firstChild;

    expect(backdrop).toBeInTheDocument();
    expect(backdrop).toHaveClass("backdrop");
    expect(backdrop).toHaveClass("backdrop--grey");
  });

  it("should dispatch 5 actions on Backdrop click", () => {
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

    const { container } = render(<Backdrop />);
    const backdrop = container.firstChild;
    userEvent.click(backdrop);

    expect(dispatch).toHaveBeenCalledTimes(5);
    expect(dispatch).toHaveBeenCalledWith(currencySwitcherVisibToggle(false));
    expect(dispatch).toHaveBeenCalledWith(backdropVisibilityToggle(false));
    expect(dispatch).toHaveBeenCalledWith(miniCartVisibilityToggle(false));
    expect(dispatch).toHaveBeenCalledWith(modalToggle(false));
    expect(dispatch).toHaveBeenCalledWith(mobileNavVisibilityToggle(false));
  });
});
