/* eslint-disable import/first */
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
  const testNotSelected = ["size", "color"];
  it("should not render Modal when isModalOpen is false", () => {
    useAppSelector.mockReturnValue({ isModalOpen: false });
    const { container } = render(<Modal notSelected={testNotSelected} />);
    const modalComponent = container.firstElementChild;

    expect(modalComponent).toBeNull();
  });

  it("should render a list of list items when isModalOpen is true", () => {
    useAppSelector.mockReturnValue({ isModalOpen: true });
    render(<Modal notSelected={testNotSelected} />);

    const list = screen.getByRole("list");
    const listItem = list.firstElementChild;

    expect(list).toBeInTheDocument();
    expect(listItem).not.toBeNull();
  });

  it("should dispatch 2 actions after button click", () => {
    useAppSelector.mockReturnValue({ isModalOpen: true });
    useAppDispatch.mockReturnValue(dispatch);
    const { modalToggle, backdropVisibilityToggle } = uiActions;

    render(<Modal notSelected={testNotSelected} />);

    const button = screen.getByRole("button");
    userEvent.click(button);

    expect(dispatch).toBeCalledTimes(2);
    expect(dispatch).toBeCalledWith(modalToggle(false));
    expect(dispatch).toBeCalledWith(backdropVisibilityToggle(false));
  });
});
