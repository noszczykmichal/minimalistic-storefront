import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";

import { useAppSelector } from "@/hooks/useReduxHooks";
import RadioInput from "@/components/Forms/Inputs/RadioInput/RadioInput";
import type { RootState } from "@/store/store";
import type { Currency, FieldOption } from "@/types/types";

vi.mock("@/hooks/useReduxHooks", () => ({
  useAppSelector: vi.fn(),
}));

const testOption: FieldOption<string> = {
  label: "Cash on collection",
  name: "cash_on_collection",
  costs: [
    { amount: 1.99, currency: { label: "USD", symbol: "$" } },
    { amount: 1.49, currency: { label: "GBP", symbol: "£" } },
  ],
};

const createRegistration = (name = "paymentMethod") => ({
  name,
  onChange: vi.fn(),
  onBlur: vi.fn(),
  ref: vi.fn(),
});

describe("RadioInput component", () => {
  let registration: ReturnType<typeof createRegistration>;

  const renderRadioInput = (
    billingCurrency: Currency = { label: "USD", symbol: "$" },
  ) => {
    const state = { products: { billingCurrency } } as unknown as RootState;
    vi.mocked(useAppSelector).mockImplementation((selector) => selector(state));

    return render(
      <RadioInput inputDetails={testOption} registration={registration} />,
    );
  };

  beforeEach(() => {
    vi.clearAllMocks();
    registration = createRegistration();
  });

  it("should render a radio input associated with its label", () => {
    renderRadioInput();

    const radio = screen.getByLabelText(/Cash on collection/);

    expect(radio).toHaveAttribute("type", "radio");
    expect(radio).toHaveAttribute("name", "paymentMethod");
    expect(radio).toHaveAttribute("value", "cash_on_collection");
  });

  it("should show the option price in the billing currency", () => {
    renderRadioInput({
      label: "USD",
      symbol: "$",
    });

    expect(
      screen.getByLabelText("Cash on collection - $1.99"),
    ).toBeInTheDocument();
  });

  it("should show the option price in a different billing currency", () => {
    renderRadioInput({
      label: "GBP",
      symbol: "£",
    });

    expect(
      screen.getByLabelText("Cash on collection - £1.49"),
    ).toBeInTheDocument();
  });

  it("should show a price of 0.00 when there is no price for the billing currency", () => {
    renderRadioInput({
      label: "JPY",
      symbol: "¥",
    });

    expect(
      screen.getByLabelText("Cash on collection - ¥0.00"),
    ).toBeInTheDocument();
  });

  it("should call registration.onChange and check the input when clicked", async () => {
    renderRadioInput();

    const radio = screen.getByLabelText(/Cash on collection/);
    await userEvent.click(radio);

    expect(registration.onChange).toHaveBeenCalledOnce();
    expect(radio).toBeChecked();
  });

  it("should call registration.onBlur when the input loses focus", async () => {
    renderRadioInput();

    await userEvent.click(screen.getByLabelText(/Cash on collection/));
    await userEvent.tab();

    expect(registration.onBlur).toHaveBeenCalledOnce();
  });

  it("should pass the input element to registration.ref", () => {
    renderRadioInput();

    expect(registration.ref).toHaveBeenCalledWith(
      screen.getByLabelText(/Cash on collection/),
    );
  });
});
