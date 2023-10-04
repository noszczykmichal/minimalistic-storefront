jest.mock("../../../../hooks/useReduxHooks.ts", () => ({
  useAppDispatch: jest.fn(),
}));

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import ToggleButton from "./ToggleButton";
import { useAppDispatch } from "../../../../hooks/useReduxHooks";
import { uiActions } from "../../../../store/uiSlice";

describe("ToggleButton component", () => {
  const dispatch = jest.fn();
  const {
    backdropVisibilityToggle,
    backdropTypeToggle,
    miniCartVisibilityToggle,
    mobileNavVisibilityToggle,
  } = uiActions;

  beforeEach(() => {
    jest.clearAllMocks();
    useAppDispatch.mockReturnValue(dispatch);
  });

  it("should render a button", () => {
    render(<ToggleButton />);
    const toggleButton = screen.getByRole("button");

    expect(toggleButton).toBeInTheDocument();
  });

  it("should dispatch actions on ToggleButton click", () => {
    render(<ToggleButton />);
    const toggleButton = screen.getByRole("button");
    userEvent.click(toggleButton);

    expect(dispatch).toHaveBeenCalledTimes(4);
    expect(dispatch).toHaveBeenCalledWith(backdropVisibilityToggle(true));
    expect(dispatch).toHaveBeenCalledWith(backdropTypeToggle(false));
    expect(dispatch).toHaveBeenCalledWith(miniCartVisibilityToggle(false));
    expect(dispatch).toHaveBeenCalledWith(mobileNavVisibilityToggle(true));
  });
});
