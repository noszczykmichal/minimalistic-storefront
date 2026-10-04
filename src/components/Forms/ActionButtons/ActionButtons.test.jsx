import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";

import ActionButtons from "@/components/Forms/ActionButtons/ActionButtons";

describe("ActionButtons component", () => {
  const onNextButtonClickMock = vi.fn();
  const onBackButtonClickMock = vi.fn();

  const renderActionButtons = (props = {}) =>
    render(
      <ActionButtons
        nextButtonHandler={onNextButtonClickMock}
        backButtonHandler={onBackButtonClickMock}
        {...props}
      />,
    );

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should render an enabled 'Next' button by default", () => {
    renderActionButtons();

    const nextButton = screen.getByText("Next");

    expect(nextButton).toBeInTheDocument();
    expect(nextButton).not.toHaveAttribute("disabled");
  });

  it("should disable the 'Next' button when 'isNextBttnDisabled' is true", () => {
    renderActionButtons({ isNextBttnDisabled: true });

    expect(screen.getByText("Next")).toHaveAttribute("disabled");
  });

  it("should render the 'Next' button with custom text when 'nextBttnCustomText' is provided", () => {
    renderActionButtons({ nextBttnCustomText: "Confirm & Order" });

    expect(screen.getByText("Confirm & Order")).toBeInTheDocument();
    expect(screen.queryByText("Next")).not.toBeInTheDocument();
  });

  it("should apply a custom class to the wrapper when 'customClass' is provided", () => {
    renderActionButtons({ customClass: "my-custom-class" });

    expect(screen.getByTestId("actionButtonsWrapper")).toHaveClass(
      "my-custom-class",
    );
  });

  it("should call 'backButtonHandler' when the 'Back' button is clicked", async () => {
    renderActionButtons();

    await userEvent.click(screen.getByText("Back"));

    expect(onBackButtonClickMock).toHaveBeenCalledOnce();
    expect(onNextButtonClickMock).not.toHaveBeenCalled();
  });

  it("should call 'nextButtonHandler' when the 'Next' button is clicked", async () => {
    renderActionButtons();

    await userEvent.click(screen.getByText("Next"));

    expect(onNextButtonClickMock).toHaveBeenCalledOnce();
    expect(onBackButtonClickMock).not.toHaveBeenCalled();
  });

  it("should not call 'nextButtonHandler' when the 'Next' button is disabled", async () => {
    renderActionButtons({ isNextBttnDisabled: true });

    await userEvent.click(screen.getByText("Next"));

    expect(onNextButtonClickMock).not.toHaveBeenCalled();
  });
});
