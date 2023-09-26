jest.mock("../../../../hooks/useReduxHooks.ts", () => ({
  useAppSelector: jest.fn(),
  useAppDispatch: jest.fn(),
}));

import { fireEvent, render, screen } from "@testing-library/react";

import TextInput from "./TextInput";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../../hooks/useReduxHooks";
import { shippingAddressActions } from "../../../../store/shippingAddress";

const testProps = {
  label: "First Name",
  type: "text",
  name: "fName",
  errorMessage: "test error",
  validator: () => true,
};

describe("TextInput component", () => {
  const dispatch = jest.fn();
  const { inputChangeHandler, inputBlurHandler, registerInput } =
    shippingAddressActions;
  beforeEach(() => {
    jest.clearAllMocks();
    useAppDispatch.mockReturnValue(dispatch);
    useAppSelector.mockReturnValue({ inputs: {} });
  });

  it("should render input element with the correct name and type attributes wrapped within a label", () => {
    render(<TextInput inputDetails={testProps} />);
    const labelElement = screen.getByText(testProps.label);
    const inputElement = screen.getByRole("textbox");

    expect(labelElement).toBeInTheDocument();
    expect(inputElement).toHaveAttribute("type", testProps.type);
    expect(inputElement).toHaveAttribute("name", testProps.name);
  });

  it("should apply correct classes and not display an error message when hasError is false", () => {
    useAppSelector.mockReturnValueOnce({
      inputs: { fName: { hasError: false } },
    });

    render(<TextInput inputDetails={testProps} />);
    const inputElement = screen.getByRole("textbox");
    const errorMessageEl = screen.queryByText(testProps.errorMessage);

    expect(inputElement).toHaveClass("form-control__input");
    expect(inputElement).not.toHaveClass("form-control__input--hasError");
    expect(errorMessageEl).not.toBeInTheDocument();
  });

  it("should apply correct classes and display an error message when hasError is true", () => {
    useAppSelector.mockReturnValueOnce({
      inputs: { fName: { hasError: true } },
    });

    render(<TextInput inputDetails={testProps} />);
    const inputElement = screen.getByRole("textbox");
    const errorMessageEl = screen.getByText(testProps.errorMessage);

    expect(inputElement).toHaveClass(
      "form-control__input",
      "form-control__input--hasError",
    );
    expect(errorMessageEl).toBeInTheDocument();
  });

  it("should dispatch a correct action in the useEffect hook and pass required data", () => {
    render(<TextInput inputDetails={testProps} />);

    expect(dispatch).toHaveBeenCalledWith(registerInput(testProps.name));
  });

  it("should dispatch a correct action on input change and pass required data", () => {
    render(<TextInput inputDetails={testProps} />);
    const inputElement = screen.getByRole("textbox");
    const updatedValue = "testValue";

    fireEvent.change(inputElement, { target: { value: updatedValue } });

    expect(dispatch).toHaveBeenCalledWith(
      inputChangeHandler({
        value: updatedValue,
        name: testProps.name,
        validator: testProps.validator,
      }),
    );
  });

  it("should dispatch a correct action on input blur and pass required data", () => {
    render(<TextInput inputDetails={testProps} />);
    const inputElement = screen.getByRole("textbox");
    const updatedValue = "testBlur";

    fireEvent.blur(inputElement, { target: { value: updatedValue } });

    expect(dispatch).toHaveBeenCalledWith(
      inputBlurHandler({
        value: updatedValue,
        name: testProps.name,
        validator: testProps.validator,
      }),
    );
  });
});
