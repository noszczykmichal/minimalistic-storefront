import { render, screen, within } from "@testing-library/react";
import { axe } from "vitest-axe";
import configureMockStore from "redux-mock-store";

import ProductList from "@/components/Products/ProductList/ProductList";
import WithMockStoreAndRouter from "@/utils/WithMockStoreAndRouter";
import type { ProductType } from "@/types/types";

const testProducts: ProductType[] = [
  {
    id: "jacket-canada-goosee",
    name: "Jacket",
    brand: "Canada Goose",
    description: "<p>Awesome winter jacket</p>",
    inStock: true,
    gallery: ["https://example.com/jacket.jpg"],
    attributes: [],
    prices: [
      { currency: { label: "USD", symbol: "$" }, amount: 518.47 },
      { currency: { label: "GBP", symbol: "£" }, amount: 372.67 },
    ],
  },
  {
    id: "ps-5",
    name: "PlayStation 5",
    brand: "Sony",
    description: "<p>Game console</p>",
    inStock: false,
    gallery: ["https://example.com/ps5.jpg"],
    attributes: [],
    prices: [
      { currency: { label: "USD", symbol: "$" }, amount: 844.02 },
      { currency: { label: "GBP", symbol: "£" }, amount: 606.67 },
    ],
  },
];

const renderProductList = (products: ProductType[] = testProducts) =>
  render(
    <WithMockStoreAndRouter
      customStore={configureMockStore([])({
        products: { billingCurrency: "$" },
      })}
    >
      <ProductList products={products} />
    </WithMockStoreAndRouter>,
  );

describe("ProductList component", () => {
  it("should render a list item for each product", () => {
    renderProductList();

    expect(
      within(screen.getByRole("list")).getAllByRole("listitem"),
    ).toHaveLength(testProducts.length);
  });

  it("should render the products in the given order", () => {
    renderProductList();

    const [firstItem, secondItem] = screen.getAllByRole("listitem");

    expect(firstItem).toHaveTextContent("Canada Goose Jacket");
    expect(firstItem).toHaveTextContent("$518.47");
    expect(secondItem).toHaveTextContent("Sony PlayStation 5");
    expect(secondItem).toHaveTextContent("$844.02");
  });

  it("should render an empty list when there are no products", () => {
    renderProductList([]);

    expect(screen.getByRole("list")).toBeEmptyDOMElement();
  });

  it("should have no accessibility violations", async () => {
    const { container } = renderProductList();

    expect(await axe(container)).toHaveNoViolations();
  });
});
