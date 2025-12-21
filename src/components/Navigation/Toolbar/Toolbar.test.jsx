vi.mock("@/hooks/useReduxHooks", () => ({
  useAppSelector: vi.fn(),
  useAppDispatch: vi.fn(),
}));

import { render, screen } from "@testing-library/react";
import { axe } from "jest-axe";
import { MemoryRouter } from "react-router";

import Toolbar from "@/components/Navigation/Toolbar/Toolbar";
import { useAppDispatch, useAppSelector } from "@/hooks/useReduxHooks";

describe("Toolbar component", () => {
  const dispatch = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    useAppDispatch.mockReturnValue(dispatch);
  });

  it("should render NavigationItems and CurrencySwitcher when props categories and currencies are non empty arrays", () => {
    const modalRoot = document.createElement("div");
    modalRoot.setAttribute("id", "modals-root");

    useAppSelector.mockReturnValue({
      categories: ["testString", "testString2"],
      currencies: [
        { label: "USD", symbol: "$" },
        { label: "GBP", symbol: "£" },
      ],
      billingCurrency: "$",
      totalPrice: 0,
    });

    render(
      <MemoryRouter>
        <Toolbar />
      </MemoryRouter>,
      { container: document.body.appendChild(modalRoot) },
    );

    const { categories, billingCurrency } =
      useAppSelector.mock.results[0].value;
    const listElement = screen.getByRole("list");
    const navigationItems = screen.getAllByRole("listitem");
    const currencySwitcher = screen.getByText(billingCurrency);

    expect(listElement).toBeInTheDocument();
    expect(navigationItems).toHaveLength(categories.length);
    expect(currencySwitcher).toBeInTheDocument();
  });

  it("should not render NavigationItems and CurrencySwitcher when props categories and currencies are empty arrays", () => {
    const modalRoot = document.createElement("div");
    modalRoot.setAttribute("id", "modals-root");

    useAppSelector.mockReturnValue({
      categories: [],
      currencies: [],
      billingCurrency: "$",
      totalPrice: 0,
    });

    render(
      <MemoryRouter>
        <Toolbar />
      </MemoryRouter>,
      { container: document.body.appendChild(modalRoot) },
    );

    const navigationItemsList = screen.queryByTestId("navigation-items");
    const { billingCurrency } = useAppSelector.mock.results[0].value;
    const currencySwitcher = screen.queryByText(billingCurrency);

    expect(navigationItemsList).toBeNull();
    expect(currencySwitcher).toBeNull();
  });

  it("should have no accessibility violations", async () => {
    const modalRoot = document.createElement("div");
    modalRoot.setAttribute("id", "modals-root");

    useAppSelector.mockReturnValue({
      categories: ["testString", "testString2"],
      currencies: [
        { label: "USD", symbol: "$" },
        { label: "GBP", symbol: "£" },
      ],
      totalPrice: 0,
    });

    const { container } = render(
      <MemoryRouter>
        <Toolbar />
      </MemoryRouter>,
      { container: document.body.appendChild(modalRoot) },
    );
    const result = await axe(container);

    expect(result).toHaveNoViolations();
  });
});
