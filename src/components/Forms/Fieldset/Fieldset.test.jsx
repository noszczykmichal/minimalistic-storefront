jest.mock("../../../hooks/useReduxHooks.ts", () => ({
  ...jest.requireActual("../../../hooks/useReduxHooks.ts"),
  useAppDispatch: jest.fn(),
}));

import React from "react";
import { render, screen } from "@testing-library/react";
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";
import userEvent from "@testing-library/user-event";

import Fieldset from "./Fieldset";
import { useAppDispatch } from "../../../hooks/useReduxHooks";
import { shippingPaymentOptionsActions } from "../../../store/shippingPaymentOptions";
import WithMockStoreAndRouter from "../../../utils/WithMockStoreAndRouter";

const testOptions = [
  {
    label: "Flat Rate",
    name: "flatRate",
    costs: [
      { amount: 5.0, currency: { label: "USD", symbol: "$" } },
      { amount: 3.59, currency: { label: "GBP", symbol: "£" } },
    ],
  },
  {
    label: "Best Way",
    name: "bestWay",
    costs: [
      { amount: 10.0, currency: { label: "USD", symbol: "$" } },
      { amount: 7.19, currency: { label: "GBP", symbol: "£" } },
    ],
  },
];

const mockStore = configureStore([]);

describe("Fieldset component", () => {
  const dispatch = jest.fn();
  const { registerOption, optionChangeHandler } = shippingPaymentOptionsActions;
  const fieldIdentifier = "shippingOption";
  let store;

  beforeEach(() => {
    jest.clearAllMocks();
    jest.restoreAllMocks();
    useAppDispatch.mockReturnValue(dispatch);

    store = mockStore({
      products: { billingCurrency: "$" },
      shippingPaymentOptions: {
        inputs: { shippingOption: { value: "flatRate" } },
      },
    });
  });

  it("should render a fieldset with 2 inputs on the basis of provided data", () => {
    render(
      <WithMockStoreAndRouter customStore={store}>
        <Fieldset
          options={testOptions}
          heading="Delivery"
          identifier={fieldIdentifier}
        />
      </WithMockStoreAndRouter>,
    );

    const fieldsetElem = screen.getByRole("group");
    const radioElements = screen.getAllByRole("radio");

    expect(fieldsetElem).toBeInTheDocument();
    expect(radioElements).toHaveLength(testOptions.length);
  });

  it("should dispatch an action on initial render and register a new fieldset", () => {
    const newStore = mockStore({
      products: { billingCurrency: "$" },
      shippingPaymentOptions: {
        inputs: {},
      },
    });

    render(
      <WithMockStoreAndRouter customStore={newStore}>
        <Fieldset
          options={testOptions}
          heading="Delivery"
          identifier={fieldIdentifier}
        />
      </WithMockStoreAndRouter>,
    );

    expect(dispatch).toHaveBeenCalledTimes(1);
    expect(dispatch).toHaveBeenLastCalledWith(registerOption(fieldIdentifier));
  });

  it("should update the local state if a value for the given fieldset is found in the Redux store", () => {
    const mockedSetCheckedInputName = jest.fn();
    const mockedCheckedInputName = "";
    const mockedValue = "flatRate";
    const useStateMock = () => [
      mockedCheckedInputName,
      mockedSetCheckedInputName,
    ];

    jest.spyOn(React, "useState").mockImplementation(useStateMock);

    render(
      <Provider store={store}>
        <Fieldset
          options={testOptions}
          heading="Delivery"
          identifier={fieldIdentifier}
        />
      </Provider>,
    );

    expect(mockedSetCheckedInputName).toHaveBeenCalledTimes(1);
    expect(mockedSetCheckedInputName).toHaveBeenCalledWith(mockedValue);
  });

  it("should call clickHandler when clicked and dispatch an action", () => {
    const { costs } = testOptions[1];
    const billingCurrency = "$";
    const optionPrice = costs.find(
      (cost) => cost.currency.symbol === billingCurrency,
    ).amount;

    render(
      <WithMockStoreAndRouter customStore={store}>
        <Fieldset
          options={testOptions}
          heading="Delivery"
          identifier={fieldIdentifier}
        />
      </WithMockStoreAndRouter>,
    );

    const radioElement = screen.getByLabelText(
      new RegExp(`\\${testOptions[1].label}`),
    );

    userEvent.click(radioElement);

    expect(dispatch).toHaveBeenCalledTimes(2);
    expect(dispatch).toHaveBeenNthCalledWith(
      2,
      optionChangeHandler({
        identifier: fieldIdentifier,
        name: radioElement.getAttribute("name"),
        optionCost: optionPrice,
      }),
    );
  });
});
