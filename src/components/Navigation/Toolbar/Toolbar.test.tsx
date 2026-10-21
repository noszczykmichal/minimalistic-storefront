import { render, screen } from "@testing-library/react";
import { axe } from "vitest-axe";
import { legacy_configureStore as configureMockStore } from "redux-mock-store";

import Toolbar from "@/components/Navigation/Toolbar/Toolbar";
import WithMockStoreAndRouter from "@/utils/WithMockStoreAndRouter";

const categories = ["testString", "testString2"];
const currencies = [
  { label: "USD", symbol: "$" },
  { label: "GBP", symbol: "£" },
];
const billingCurrency = "$";

const renderToolbar = (
  categoriesList = categories,
  currenciesList = currencies,
) =>
  render(
    <WithMockStoreAndRouter
      customStore={configureMockStore([])({
        ui: {
          categories: categoriesList,
          currencies: currenciesList,
        },
        auth: { status: "authenticated" },
        products: { billingCurrency, totalPrice: 0 },
      })}
    >
      <Toolbar />
    </WithMockStoreAndRouter>,
  );

describe("Toolbar component", () => {
  let modalsRoot: HTMLDivElement;

  beforeEach(() => {
    modalsRoot = document.createElement("div");
    modalsRoot.setAttribute("id", "modals-root");
    document.body.appendChild(modalsRoot);
  });

  afterEach(() => {
    modalsRoot.remove();
  });

  it("should render NavigationItems and CurrencySwitcher when the store has categories and currencies", () => {
    renderToolbar();

    const listElement = screen.getByRole("list");
    const navigationItems = screen.getAllByRole("listitem");
    const currencySwitcher = screen.getByText(billingCurrency);

    expect(listElement).toBeInTheDocument();
    expect(navigationItems).toHaveLength(categories.length);
    expect(currencySwitcher).toBeInTheDocument();
  });

  it("should not render NavigationItems and CurrencySwitcher when the store has no categories or currencies", () => {
    renderToolbar([], []);

    const navigationItemsList = screen.queryByRole("list");
    const currencySwitcher = screen.queryByText(billingCurrency);

    expect(navigationItemsList).toBeNull();
    expect(currencySwitcher).toBeNull();
  });

  it("should have no accessibility violations", async () => {
    const { container } = renderToolbar();
    const result = await axe(container);

    expect(result).toHaveNoViolations();
  });
});
