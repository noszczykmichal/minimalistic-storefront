jest.mock("../../../../hooks/useReduxHooks.ts", () => ({
  useAppDispatch: jest.fn(),
  useAppSelector: jest.fn(),
}));

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import CartIcon from "./CartIcon";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../../hooks/useReduxHooks";
import { uiActions } from "../../../../store/uiSlice";

describe("CartIcon component", () => {
  const dispatch = jest.fn();
  const {
    backdropVisibilityToggle,
    backdropTypeToggle,
    miniCartVisibilityToggle,
    currencySwitcherVisibToggle,
  } = uiActions;

  beforeEach(() => {
    jest.clearAllMocks();
    useAppDispatch.mockReturnValue(dispatch);
    useAppSelector.mockReturnValue({ productsTotal: 1 });
  });

  it("should render a CartIcon", () => {
    render(<CartIcon />);
    const cartIcon = screen.getByRole("button");

    expect(cartIcon).toBeInTheDocument();
  });
  it("should render a disabled CartIcon if productsTotal value equals 0", () => {
    useAppSelector.mockReturnValueOnce({ productsTotal: 0 });

    render(<CartIcon />);
    const cartIcon = screen.getByRole("button");

    expect(cartIcon).toBeDisabled();
  });
  it("should dispatch actions on  CartIcon click", () => {
    render(<CartIcon />);
    const cartIcon = screen.getByRole("button");
    userEvent.click(cartIcon);

    expect(dispatch).toHaveBeenCalledTimes(4);
    expect(dispatch).toHaveBeenCalledWith(backdropVisibilityToggle(true));
    expect(dispatch).toHaveBeenCalledWith(backdropTypeToggle(false));
    expect(dispatch).toHaveBeenCalledWith(miniCartVisibilityToggle(true));
    expect(dispatch).toHaveBeenCalledWith(currencySwitcherVisibToggle(false));
  });
});
