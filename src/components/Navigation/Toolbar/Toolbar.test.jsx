jest.mock("../../../hooks/useReduxHooks.ts", () => ({
  useAppSelector: jest.fn(),
  useAppDispatch: jest.fn(),
}));

import { render, screen } from "@testing-library/react";
import { axe } from "jest-axe";
import ReactDOM from "react-dom";
import { MemoryRouter } from "react-router";

import Toolbar from "./Toolbar";
import { useAppDispatch, useAppSelector } from "../../../hooks/useReduxHooks";

describe("Toolbar component", () => {
  jest.spyOn(ReactDOM, "createPortal").mockImplementationOnce(() => {
    const div = document.createElement("div");
    div.setAttribute("id", "modals-root");
  });

  const dispatch = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    useAppDispatch.mockReturnValue(dispatch);
  });

  it("should render NavigationItems and CurrencySwitcher when props categories and currencies are non empty arrays", () => {
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
    useAppSelector.mockReturnValue({
      billingCurrency: "$",
      totalPrice: 0,
    });

    render(
      <MemoryRouter>
        <Toolbar />
      </MemoryRouter>,
    );

    const { billingCurrency } = useAppSelector.mock.results[0].value;
    const listElement = screen.queryByRole("list");
    const currencySwitcher = screen.queryByText(billingCurrency);

    expect(listElement).not.toBeInTheDocument();
    expect(currencySwitcher).not.toBeInTheDocument();
  });

  it("should have no accessibility violations", async () => {
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
    );
    const result = await axe(container);

    expect(result).toHaveNoViolations();
  });
});
