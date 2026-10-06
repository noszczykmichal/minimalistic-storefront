vi.mock("@/hooks/useReduxHooks", () => ({
  useAppDispatch: vi.fn(),
}));

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router";

import NavigationItem from "@/components/Navigation/NavigationItems/NavigationItem/NavigationItem";
import { useAppDispatch } from "@/hooks/useReduxHooks";
import { uiActions } from "@/store/uiSlice";

describe("NavigationItem component", () => {
  const dispatch = vi.fn();
  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(useAppDispatch).mockReturnValue(dispatch);
  });

  test("should render a link with correct text and href attribute value", () => {
    const testContent = "Test content";
    const testHref = "/some-link";

    render(
      <MemoryRouter>
        <NavigationItem link={testHref}>{testContent}</NavigationItem>
      </MemoryRouter>,
    );
    const linkElement = screen.getByText(testContent);

    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveAttribute("href", testHref);
  });

  test("should dispatch 3 actions on a Navlink click", async () => {
    const {
      currencySwitcherVisibToggle,
      miniCartVisibilityToggle,
      mobileNavVisibilityToggle,
    } = uiActions;

    render(
      <MemoryRouter>
        <NavigationItem link="/some-link">Test content</NavigationItem>
      </MemoryRouter>,
    );
    const linkElement = screen.getByRole("link");
    await userEvent.click(linkElement);

    expect(dispatch).toHaveBeenCalledTimes(3);
    expect(dispatch).toHaveBeenCalledWith(currencySwitcherVisibToggle(false));
    expect(dispatch).toHaveBeenCalledWith(miniCartVisibilityToggle(false));
    expect(dispatch).toHaveBeenCalledWith(mobileNavVisibilityToggle(false));
  });
});
