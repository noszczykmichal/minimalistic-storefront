import { act, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "vitest-axe";

import Backdrop from "@/components/UI/Backdrop/Backdrop";

describe("Backdrop component", () => {
  const onClose = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("should not render Backdrop when 'isBackdropOpen' is false", () => {
    const { container } = render(
      <Backdrop isBackdropOpen={false} onClose={onClose} />,
    );
    const backdrop = container.firstChild;

    expect(backdrop).not.toBeInTheDocument();
  });

  it("should render Backdrop when 'isBackdropOpen' is true", () => {
    const { container } = render(<Backdrop isBackdropOpen onClose={onClose} />);
    const backdrop = container.firstChild;

    expect(backdrop).toBeInTheDocument();
  });

  it("should render Backdrop with the class 'backdrop' when backdropMode is 'light'", () => {
    const { container } = render(
      <Backdrop isBackdropOpen backdropMode="light" onClose={onClose} />,
    );
    const backdrop = container.firstChild;

    expect(backdrop).toBeInTheDocument();
    expect(backdrop).toHaveClass("backdrop");
    expect(backdrop).not.toHaveClass("backdrop--grey");
  });

  it("should render Backdrop with classes 'backdrop' and 'backdrop--grey' by default", () => {
    const { container } = render(<Backdrop isBackdropOpen onClose={onClose} />);
    const backdrop = container.firstChild;

    expect(backdrop).toBeInTheDocument();
    expect(backdrop).toHaveClass("backdrop");
    expect(backdrop).toHaveClass("backdrop--grey");
  });

  it("should call onClose on Backdrop click", async () => {
    const { container } = render(<Backdrop isBackdropOpen onClose={onClose} />);
    const backdrop = container.firstChild as HTMLElement;
    await userEvent.click(backdrop);

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("should play the opening animation when 'isBackdropOpen' changes to true", () => {
    vi.useFakeTimers();
    const { container, rerender } = render(
      <Backdrop isBackdropOpen={false} onClose={onClose} />,
    );

    rerender(<Backdrop isBackdropOpen onClose={onClose} />);
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
    const { container, rerender } = render(
      <Backdrop isBackdropOpen onClose={onClose} />,
    );

    rerender(<Backdrop isBackdropOpen={false} onClose={onClose} />);

    expect(container.firstChild).toHaveClass("backdrop--closed");

    act(() => {
      vi.advanceTimersByTime(500);
    });

    expect(container.firstChild).not.toBeInTheDocument();
  });

  it("should have no accessibility violations", async () => {
    const { container } = render(<Backdrop isBackdropOpen onClose={onClose} />);

    expect(await axe(container)).toHaveNoViolations();
  });
});
