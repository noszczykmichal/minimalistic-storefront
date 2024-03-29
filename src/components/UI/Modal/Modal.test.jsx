jest.mock("../../../hooks/useReduxHooks.ts", () => ({
  useAppDispatch: jest.fn(),
  useAppSelector: jest.fn(),
}));

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import Modal from "./Modal";
import { useAppDispatch, useAppSelector } from "../../../hooks/useReduxHooks";
import { uiActions } from "../../../store/uiSlice";

describe("Modal component", () => {
  const dispatch = jest.fn();
  const { modalToggle, backdropVisibilityToggle } = uiActions;
  const testNotSelected = ["size", "colour"];

  beforeEach(() => {
    jest.clearAllMocks();
    useAppDispatch.mockReturnValue(dispatch);
    useAppSelector.mockReturnValue({ isModalOpen: true });
  });

  it("should not render Modal when isModalOpen is false", () => {
    useAppSelector.mockReturnValueOnce({ isModalOpen: false });

    render(<Modal notSelected={testNotSelected} />);
    const modalComponent = screen.queryByRole("list");

    expect(modalComponent).toBeNull();
  });

  it("should render a list of list items when isModalOpen is true", () => {
    render(<Modal notSelected={testNotSelected} />);
    const listElem = screen.getByRole("list");
    const listItems = screen.getAllByRole("listitem");

    expect(listElem).toBeInTheDocument();
    expect(listItems).toHaveLength(testNotSelected.length);
  });

  it("should dispatch 2 actions after button click", () => {
    render(<Modal notSelected={testNotSelected} />);
    const button = screen.getByRole("button");
    userEvent.click(button);

    expect(dispatch).toBeCalledTimes(2);
    expect(dispatch).toBeCalledWith(modalToggle(false));
    expect(dispatch).toBeCalledWith(backdropVisibilityToggle(false));
  });
});
