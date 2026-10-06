vi.mock("@/hooks/useReduxHooks", () => ({
  useAppDispatch: vi.fn(),
  useAppSelector: vi.fn(),
}));
vi.mock("@/components/UI/Backdrop/Backdrop", () => ({
  default: ({
    isBackdropOpen,
    onClose,
  }: {
    isBackdropOpen: boolean;
    onClose: () => void;
  }) =>
    isBackdropOpen ? (
      <button type="button" onClick={onClose}>
        Close menu
      </button>
    ) : null,
}));

import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "vitest-axe";

import ToggleButton from "@/components/Navigation/MobileNavigation/ToggleButton/ToggleButton";
import { useAppDispatch, useAppSelector } from "@/hooks/useReduxHooks";
import { uiActions } from "@/store/uiSlice";
import type { RootState } from "@/store/store";

const mockToggleButtonState = (isMobileNavOpen: boolean) => {
  const state = { ui: { isMobileNavOpen } } as unknown as RootState;

  vi.mocked(useAppSelector).mockImplementation((selector) => selector(state));
};

describe("ToggleButton component", () => {
  const dispatch = vi.fn();
  const { miniCartVisibilityToggle, mobileNavVisibilityToggle } = uiActions;
  let modalsRoot: HTMLDivElement;

  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(useAppDispatch).mockReturnValue(dispatch);
    mockToggleButtonState(false);

    modalsRoot = document.createElement("div");
    modalsRoot.id = "modals-root";
    document.body.appendChild(modalsRoot);
  });

  afterEach(() => {
    modalsRoot.remove();
  });

  it("should render a button", () => {
    render(<ToggleButton />);
    const toggleButton = screen.getByRole("button", { name: "Show Menu" });

    expect(toggleButton).toBeInTheDocument();
  });

  it("should dispatch 2 actions on ToggleButton click", async () => {
    render(<ToggleButton />);
    await userEvent.click(screen.getByRole("button", { name: "Show Menu" }));

    expect(dispatch).toHaveBeenCalledTimes(2);
    expect(dispatch).toHaveBeenCalledWith(miniCartVisibilityToggle(false));
    expect(dispatch).toHaveBeenCalledWith(mobileNavVisibilityToggle(true));
  });

  it("should render the backdrop into #modals-root when the mobile nav is open", () => {
    mockToggleButtonState(true);

    render(<ToggleButton />);

    expect(
      within(modalsRoot).getByRole("button", { name: "Close menu" }),
    ).toBeInTheDocument();
  });

  it("should not render the backdrop when the mobile nav is closed", () => {
    render(<ToggleButton />);

    expect(
      screen.queryByRole("button", { name: "Close menu" }),
    ).not.toBeInTheDocument();
  });

  it("should close the mobile nav when the backdrop is clicked", async () => {
    mockToggleButtonState(true);

    render(<ToggleButton />);
    await userEvent.click(screen.getByRole("button", { name: "Close menu" }));

    expect(dispatch).toHaveBeenCalledTimes(1);
    expect(dispatch).toHaveBeenCalledWith(mobileNavVisibilityToggle(false));
  });

  it("should have no accessibility violations", async () => {
    const { container } = render(<ToggleButton />);

    expect(await axe(container)).toHaveNoViolations();
  });
});
