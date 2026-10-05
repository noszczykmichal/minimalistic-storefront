vi.mock("@/hooks/useReduxHooks", () => ({
  useAppDispatch: vi.fn(),
}));

import { act, render, screen } from "@testing-library/react";
import { axe } from "vitest-axe";

import Confirm from "@/pages/Confirm/Confirm";
import WithMockStoreAndRouter from "@/utils/WithMockStoreAndRouter";
import { useAppDispatch } from "@/hooks/useReduxHooks";
import { productActions } from "@/store/products";
import { shippingAndPaymentActions } from "@/store/shippingAddressAndPayment";

const renderConfirm = () =>
  render(
    <WithMockStoreAndRouter>
      <Confirm />
    </WithMockStoreAndRouter>,
  );

describe("Confirm page", () => {
  const dispatch = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(useAppDispatch).mockReturnValue(dispatch);
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("should render a thank you heading", () => {
    renderConfirm();

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: "Thank you for your purchase !",
      }),
    ).toBeInTheDocument();
  });

  it("should render a link back to the home page", () => {
    renderConfirm();

    expect(
      screen.getByRole("link", { name: "Ready for More Shopping?" }),
    ).toHaveAttribute("href", "/");
  });

  it("should clear the cart and the shipping and payment data on mount", () => {
    renderConfirm();

    expect(dispatch).toHaveBeenCalledTimes(2);
    expect(dispatch).toHaveBeenCalledWith(productActions.clearCart());
    expect(dispatch).toHaveBeenCalledWith(
      shippingAndPaymentActions.clearShippingAndPaymentData(),
    );
  });

  it("should show the checkmark only after 500ms", () => {
    vi.useFakeTimers();
    renderConfirm();

    act(() => {
      vi.advanceTimersByTime(499);
    });
    expect(screen.queryByTestId("checkmark")).not.toBeInTheDocument();

    act(() => {
      vi.advanceTimersByTime(1);
    });
    expect(screen.getByTestId("checkmark")).toBeInTheDocument();
  });

  it("should cancel the checkmark timer when unmounted", () => {
    vi.useFakeTimers();
    const { unmount } = renderConfirm();

    unmount();

    expect(vi.getTimerCount()).toBe(0);
  });

  it("should have no accessibility violations", async () => {
    const { container } = renderConfirm();

    expect(await axe(container)).toHaveNoViolations();
  });
});
