vi.mock("@/hooks/useReduxHooks", () => ({
  useAppSelector: vi.fn(),
  useAppDispatch: vi.fn(),
}));

import { act, render, screen } from "@testing-library/react";
import { axe } from "vitest-axe";
import { MemoryRouter } from "react-router";

import MobileNavigation from "@/components/Navigation/MobileNavigation/MobileNavigation";
import { useAppDispatch, useAppSelector } from "@/hooks/useReduxHooks";

describe("MobileNavigation component", () => {
  const categories = ["all", "tech", "clothes"];
  let mockState;

  const setUiState = (uiState) => {
    mockState = { ui: { categories, isMobileNavOpen: true, ...uiState } };
  };

  const renderComponent = () =>
    render(
      <MemoryRouter>
        <MobileNavigation />
      </MemoryRouter>,
    );

  beforeEach(() => {
    vi.clearAllMocks();
    setUiState();
    useAppDispatch.mockReturnValue(vi.fn());
    useAppSelector.mockImplementation((selector) => selector(mockState));
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("should render a link for every category from the ui state when open", () => {
    renderComponent();

    const links = screen.getAllByRole("link");

    expect(screen.getByRole("navigation")).toBeInTheDocument();
    expect(links.map((link) => link.textContent)).toEqual(categories);
  });

  it("should not render the navigation when closed", () => {
    setUiState({ isMobileNavOpen: false });

    renderComponent();

    expect(screen.queryByRole("navigation")).not.toBeInTheDocument();
  });

  it("should play the closing animation and unmount after it finishes", () => {
    vi.useFakeTimers();
    const { rerender } = renderComponent();

    setUiState({ isMobileNavOpen: false });
    rerender(
      <MemoryRouter>
        <MobileNavigation />
      </MemoryRouter>,
    );

    expect(screen.getByRole("navigation")).toHaveClass(
      "mobile-navigation--closed",
    );

    act(() => {
      vi.advanceTimersByTime(500);
    });

    expect(screen.queryByRole("navigation")).not.toBeInTheDocument();
  });

  it("should have no accessibility violations", async () => {
    const { container } = renderComponent();

    const result = await axe(container);

    expect(result).toHaveNoViolations();
  });
});
