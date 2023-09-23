jest.mock("../../../../hooks/useReduxHooks.ts", () => ({
  useAppSelector: jest.fn(),
  useAppDispatch: jest.fn(),
}));

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import RadioInput from "./RadioInput";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../../hooks/useReduxHooks";
import { shippingPaymentOptionsActions } from "../../../../store/shippingPaymentOptions";

const testProps = {
  label: "cash",
  name: "cash_on_collection",
  costs: [
    { amount: 1.99, currency: { label: "USD", symbol: "$" } },
    { amount: 1.49, currency: { label: "GBP", symbol: "£" } },
  ],
};
const testFieldID = "testID";

describe("RadioInput component", () => {
  const dispatch = jest.fn();
  const { updatePriceOfAnOption } = shippingPaymentOptionsActions;
  it("should render RadioInput with correct label, name and value attributes", () => {
    useAppSelector.mockReturnValue({ billingCurrency: "$" });
    useAppDispatch.mockReturnValue(dispatch);

    render(<RadioInput inputDetails={testProps} />);
    const label = screen.getByText(testProps.label);
    const radioInput = screen.getByRole("radio");

    expect(label).toBeInTheDocument();
    expect(radioInput).toHaveAttribute("name", testProps.name);
    expect(radioInput).toHaveAttribute("value", testProps.name);
  });

  it("should have checked attribute when 'checkedInputName' equals value of the 'name' prop", () => {
    useAppSelector.mockReturnValue({ billingCurrency: "$" });
    useAppDispatch.mockReturnValue(dispatch);

    render(
      <RadioInput inputDetails={testProps} checkedInputName={testProps.name} />,
    );
    const radioInput = screen.getByRole("radio");

    expect(radioInput).toHaveAttribute("checked");
  });

  it("should dispatch action on initial render if input is checked", () => {
    useAppSelector.mockReturnValue({ billingCurrency: "$" });
    useAppDispatch.mockReturnValue(dispatch);

    render(
      <RadioInput
        inputDetails={testProps}
        checkedInputName={testProps.name}
        fieldsetId={testFieldID}
      />,
    );

    expect(dispatch).toHaveBeenCalledTimes(1);
    expect(dispatch).toHaveBeenCalledWith(
      updatePriceOfAnOption({
        fieldsetId: testFieldID,
        optionPrice: testProps.costs[0].amount,
      }),
    );
  });

  it("should NOT dispatch action on initial render if input is not checked", () => {
    useAppSelector.mockReturnValue({ billingCurrency: "$" });
    useAppDispatch.mockReturnValue(dispatch);

    render(
      <RadioInput
        inputDetails={testProps}
        checkedInputName="foo"
        fieldsetId={testFieldID}
      />,
    );

    expect(dispatch).not.toHaveBeenCalled();
  });

  it("should update based on billingCurrency change and send action with updated data", () => {
    useAppSelector.mockReturnValue({ billingCurrency: "$" });
    useAppDispatch.mockReturnValue(dispatch);

    const { rerender } = render(
      <RadioInput
        inputDetails={testProps}
        checkedInputName={testProps.name}
        fieldsetId={testFieldID}
      />,
    );
    const regEx = new RegExp(
      `\\${testProps.costs[0].currency.symbol + testProps.costs[0].amount}`,
    );

    const label = screen.getByText(regEx);

    expect(label).toBeInTheDocument();

    useAppSelector.mockReturnValue({ billingCurrency: "£" });
    rerender(
      <RadioInput
        inputDetails={testProps}
        checkedInputName={testProps.name}
        fieldsetId={testFieldID}
      />,
    );
    const updatedRegEx = new RegExp(
      `\\${testProps.costs[1].currency.symbol + testProps.costs[1].amount}`,
    );
    const updatedLabel = screen.getByText(updatedRegEx);

    expect(updatedLabel).toBeInTheDocument();
    expect(dispatch).toHaveBeenCalledTimes(2);
    expect(dispatch).toHaveBeenCalledWith(
      updatePriceOfAnOption({
        fieldsetId: testFieldID,
        optionPrice: testProps.costs[1].amount,
      }),
    );
  });

  it("should call the onChangeHandler with the correct arguments on change", () => {
    useAppSelector.mockReturnValue({ billingCurrency: "$" });
    useAppDispatch.mockReturnValue(dispatch);
    const mockedClicked = jest.fn();
    render(
      <RadioInput
        inputDetails={testProps}
        clicked={mockedClicked}
        fieldsetId={testFieldID}
        checkedInputName="foo"
      />,
    );
    const radioInput = screen.getByRole("radio");
    userEvent.click(radioInput);

    expect(mockedClicked).toHaveBeenCalledTimes(1);
    expect(mockedClicked).toHaveBeenCalledWith(
      expect.anything(),
      testProps.costs[0].amount,
    );
  });
});
