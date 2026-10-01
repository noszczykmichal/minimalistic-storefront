import { render, screen } from "@testing-library/react";
import configureStore from "redux-mock-store";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";

import Fieldset from "@/components/Forms/Fieldset/Fieldset";
import WithMockStoreAndRouter from "@/utils/WithMockStoreAndRouter";

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

const createRegistration = (name = "shippingOption") => ({
  name,
  onChange: vi.fn(),
  onBlur: vi.fn(),
  ref: vi.fn(),
});

describe("Fieldset component", () => {
  let registration;

  const renderFieldset = ({ billingCurrency = "$", ...props } = {}) => {
    const store = mockStore({ products: { billingCurrency } });

    return render(
      <WithMockStoreAndRouter customStore={store}>
        <Fieldset
          options={testOptions}
          legend="Choose a shipping method"
          registration={registration}
          {...props}
        />
      </WithMockStoreAndRouter>,
    );
  };

  beforeEach(() => {
    registration = createRegistration();
  });

  it("should render a fieldset named by its legend", () => {
    renderFieldset();

    expect(
      screen.getByRole("group", { name: "Choose a shipping method" }),
    ).toBeInTheDocument();
  });

  it("should render one radio input per option with the correct name and value", () => {
    renderFieldset();

    const radios = screen.getAllByRole("radio");

    expect(radios).toHaveLength(testOptions.length);
    radios.forEach((radio, index) => {
      expect(radio).toHaveAttribute("name", "shippingOption");
      expect(radio).toHaveAttribute("value", testOptions[index].name);
    });
  });

  it("should show option prices in the billing currency", () => {
    renderFieldset();

    expect(screen.getByLabelText(/Flat Rate - \$5\.00/)).toBeInTheDocument();
    expect(screen.getByLabelText(/Best Way - \$10\.00/)).toBeInTheDocument();
  });

  it("should show option prices in a different billing currency", () => {
    renderFieldset({ billingCurrency: "£" });

    expect(screen.getByLabelText(/Flat Rate - £3\.59/)).toBeInTheDocument();
    expect(screen.getByLabelText(/Best Way - £7\.19/)).toBeInTheDocument();
  });

  it("should not render an error message when there is no error", () => {
    renderFieldset();

    expect(
      screen.queryByText("Choose a shipping method."),
    ).not.toBeInTheDocument();
  });

  it("should render the error message when an error is passed", () => {
    renderFieldset({ error: "Choose a shipping method." });

    expect(screen.getByText("Choose a shipping method.")).toBeInTheDocument();
  });

  it("should call registration.onChange when an option is selected", () => {
    renderFieldset();

    userEvent.click(screen.getByLabelText(/Best Way/));

    expect(registration.onChange).toHaveBeenCalledOnce();
    expect(screen.getByLabelText(/Best Way/)).toBeChecked();
  });

  it("should register every radio input with React Hook Form", () => {
    renderFieldset();

    expect(registration.ref).toHaveBeenCalledTimes(testOptions.length);
  });
});
