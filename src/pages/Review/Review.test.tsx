vi.mock("react-router", async (importActual) => {
  const actual = await importActual<typeof import("react-router")>();
  return { ...actual, useNavigate: vi.fn() };
});

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "vitest-axe";
import { legacy_configureStore as configureMockStore } from "redux-mock-store";
import { useNavigate } from "react-router";

import Review from "@/pages/Review/Review";
import WithMockStoreAndRouter from "@/utils/WithMockStoreAndRouter";
import { testItemDetails } from "@/utils/testUtils";
import type { AddressAndPaymentFormInput } from "@/utils/form/schemas";

const testDraft: Partial<AddressAndPaymentFormInput> = {
  firstName: "Jane",
  lastName: "Doe",
  addressLine1: "Main St 1",
  addressLine2: "Apt 2",
  postalCode: "00-001",
  city: "Warsaw",
  country: "Poland",
  phone: "123456789",
  email: "jane@example.com",
  shippingOption: "bestWay",
  paymentMethod: "credit_card",
};

const renderReview = () =>
  render(
    <WithMockStoreAndRouter
      customStore={configureMockStore([])({
        products: {
          cart: [testItemDetails],
          totalPrice: 518.47,
          billingCurrency: "$",
        },
        shippingAddressAndPayment: { draft: testDraft },
      })}
    >
      <Review />
    </WithMockStoreAndRouter>,
  );

describe("Review page", () => {
  const navigate = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(useNavigate).mockReturnValue(navigate);
  });

  it("should render an 'Order review' page heading", () => {
    renderReview();

    expect(
      screen.getByRole("heading", { level: 1, name: "Order review" }),
    ).toBeInTheDocument();
  });

  it("should render the order summary with the cart items and costs", () => {
    renderReview();

    expect(screen.getByText("Order Summary")).toBeInTheDocument();
    expect(
      screen.getByRole("img", { name: "Canada Goose Jacket" }),
    ).toBeInTheDocument();
    expect(screen.getByText("Shipping:")).toBeInTheDocument();
    expect(screen.getByText("$528.47")).toBeInTheDocument();
  });

  it("should render the shipping address from the checkout draft", () => {
    renderReview();

    expect(
      screen.getByRole("heading", { level: 2, name: "Shipping Address" }),
    ).toBeInTheDocument();
    expect(screen.getByText(/Jane Doe/)).toBeInTheDocument();
    expect(screen.getByText(/Main St 1 Apt 2/)).toBeInTheDocument();
    expect(screen.getByText(/00-001 Warsaw/)).toBeInTheDocument();
    expect(screen.getByText(/Poland/)).toBeInTheDocument();
    expect(screen.getByText(/tel: 123456789/)).toBeInTheDocument();
    expect(screen.getByText(/email: jane@example\.com/)).toBeInTheDocument();
  });

  it("should render the labels of the chosen shipping and payment methods", () => {
    renderReview();

    expect(
      screen.getByRole("heading", { level: 2, name: "Shipping Method" }),
    ).toBeInTheDocument();
    expect(screen.getByText("Best Way")).toBeInTheDocument();
    expect(screen.getByText("Table Rate")).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { level: 2, name: "Payment Method" }),
    ).toBeInTheDocument();
    expect(screen.getByText("Credit card")).toBeInTheDocument();
  });

  it.each([
    ["Change shipping address", "/cart/shipping/address&payment?step=1"],
    ["Change shipping method", "/cart/shipping/address&payment?step=2"],
    ["Change payment method", "/cart/shipping/address&payment?step=2"],
  ])(
    "should navigate to the right form step when '%s' is clicked",
    async (buttonName, expectedPath) => {
      renderReview();

      await userEvent.click(screen.getByRole("button", { name: buttonName }));

      expect(navigate).toHaveBeenCalledTimes(1);
      expect(navigate).toHaveBeenCalledWith(expectedPath);
    },
  );

  it("should navigate back when 'Back' is clicked", async () => {
    renderReview();

    await userEvent.click(screen.getByRole("button", { name: "Back" }));

    expect(navigate).toHaveBeenCalledTimes(1);
    expect(navigate).toHaveBeenCalledWith(-1);
  });

  it("should navigate to the confirmation page when 'Confirm & Order' is clicked", async () => {
    renderReview();

    await userEvent.click(
      screen.getByRole("button", { name: "Confirm & Order" }),
    );

    expect(navigate).toHaveBeenCalledTimes(1);
    expect(navigate).toHaveBeenCalledWith("/cart/confirm");
  });

  it("should have no accessibility violations", async () => {
    const { container } = renderReview();

    expect(await axe(container)).toHaveNoViolations();
  });
});
