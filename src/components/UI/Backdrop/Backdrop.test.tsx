vi.mock("@/hooks/useReduxHooks", () => ({
  useAppSelector: vi.fn(),
  useAppDispatch: vi.fn(),
}));

import { act, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "vitest-axe";

import Backdrop from "@/components/UI/Backdrop/Backdrop";
import { useAppSelector, useAppDispatch } from "@/hooks/useReduxHooks";
import { uiActions } from "@/store/uiSlice";
import type { RootState } from "@/store/store";

const mockBackdropState = (isBackdropOpen: boolean, backdropMode = "dark") => {
  const state = {
    ui: { isBackdropOpen, backdropMode },
  } as unknown as RootState;

  vi.mocked(useAppSelector).mockImplementation((selector) => selector(state));
};

describe("Backdrop component", () => {
  const dispatch = vi.fn();
  const {
    currencySwitcherVisibToggle,
    backdropVisibilityToggle,
    miniCartVisibilityToggle,
    modalToggle,
    mobileNavVisibilityToggle,
  } = uiActions;

  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(useAppDispatch).mockReturnValue(dispatch);
    mockBackdropState(true);
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("should not render Backdrop when 'isBackdropOpen' is false", () => {
    mockBackdropState(false);

    const { container } = render(<Backdrop />);
    const backdrop = container.firstChild;

    expect(backdrop).not.toBeInTheDocument();
  });

  it("should render Backdrop when 'isBackdropOpen' is true", () => {
    const { container } = render(<Backdrop />);
    const backdrop = container.firstChild;

    expect(backdrop).toBeInTheDocument();
  });

  it("should render Backdrop with the class 'backdrop' when backdropMode is 'light", () => {
    mockBackdropState(true, "light");

    const { container } = render(<Backdrop />);
    const backdrop = container.firstChild;

    expect(backdrop).toBeInTheDocument();
    expect(backdrop).toHaveClass("backdrop");
    expect(backdrop).not.toHaveClass("backdrop--grey");
  });

  it("should render Backdrop with classes 'backdrop' and 'backdrop--grey' when 'isBackdropTransparent' is false", () => {
    const { container } = render(<Backdrop />);
    const backdrop = container.firstChild;

    expect(backdrop).toBeInTheDocument();
    expect(backdrop).toHaveClass("backdrop");
    expect(backdrop).toHaveClass("backdrop--grey");
  });

  it("should dispatch 5 actions on Backdrop click", async () => {
    const { container } = render(<Backdrop />);
    const backdrop = container.firstChild as HTMLElement;
    await userEvent.click(backdrop);

    expect(dispatch).toHaveBeenCalledTimes(5);
    expect(dispatch).toHaveBeenCalledWith(currencySwitcherVisibToggle(false));
    expect(dispatch).toHaveBeenCalledWith(backdropVisibilityToggle(false));
    expect(dispatch).toHaveBeenCalledWith(miniCartVisibilityToggle(false));
    expect(dispatch).toHaveBeenCalledWith(modalToggle(false));
    expect(dispatch).toHaveBeenCalledWith(mobileNavVisibilityToggle(false));
  });

  it("should play the opening animation when 'isBackdropOpen' changes to true", () => {
    vi.useFakeTimers();
    mockBackdropState(false);
    const { container, rerender } = render(<Backdrop />);

    mockBackdropState(true);
    rerender(<Backdrop />);
    const backdrop = container.firstChild;

    expect(backdrop).toHaveClass("backdrop--open");

    act(() => {
      vi.advanceTimersByTime(500);
    });

    expect(backdrop).not.toHaveClass("backdrop--open");
    expect(backdrop).toBeInTheDocument();
  });

  it("should play the closing animation and then unmount when 'isBackdropOpen' changes to false", () => {
    vi.useFakeTimers();
    const { container, rerender } = render(<Backdrop />);

    mockBackdropState(false);
    rerender(<Backdrop />);

    expect(container.firstChild).toHaveClass("backdrop--closed");

    act(() => {
      vi.advanceTimersByTime(500);
    });

    expect(container.firstChild).not.toBeInTheDocument();
  });

  it("should have no accessibility violations", async () => {
    const { container } = render(<Backdrop />);

    expect(await axe(container)).toHaveNoViolations();
  });
});
