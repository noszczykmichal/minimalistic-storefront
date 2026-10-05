import { render, screen } from "@testing-library/react";
import { axe } from "vitest-axe";
import { legacy_configureStore as configureMockStore } from "redux-mock-store";
import { MockedProvider, type MockedResponse } from "@apollo/client/testing";

import PLP, { PRODUCTS_QUERY } from "@/pages/PLP/PLP";
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
    prices: [{ currency: { label: "USD", symbol: "$" }, amount: 518.47 }],
  },
  {
    id: "ps-5",
    name: "PlayStation 5",
    brand: "Sony",
    description: "<p>Game console</p>",
    inStock: false,
    gallery: ["https://example.com/ps5.jpg"],
    attributes: [],
    prices: [{ currency: { label: "USD", symbol: "$" }, amount: 844.02 }],
  },
];

// MockedProvider adds __typename to every selection set, as Apollo Client does
// in the app, so the mocked response has to carry it too.
const withTypenames = (product: ProductType) => ({
  __typename: "Product",
  ...product,
  attributes: product.attributes.map((attribute) => ({
    __typename: "AttributeSet",
    ...attribute,
    items: attribute.items.map((item) => ({
      __typename: "Attribute",
      ...item,
    })),
  })),
  prices: product.prices.map((price) => ({
    __typename: "Price",
    ...price,
    currency: { __typename: "Currency", ...price.currency },
  })),
});

const createProductsMock = (
  searchedCategory: string,
  products: ProductType[] = testProducts,
): MockedResponse => ({
  request: { query: PRODUCTS_QUERY, variables: { searchedCategory } },
  result: {
    data: {
      category: {
        __typename: "Category",
        products: products.map(withTypenames),
      },
    },
  },
});

const renderPLP = (mocks: MockedResponse[], initialPath = "/") =>
  render(
    <MockedProvider mocks={mocks}>
      <WithMockStoreAndRouter
        customStore={configureMockStore([])({
          products: { billingCurrency: "$" },
        })}
        initialPath={initialPath}
      >
        <PLP />
      </WithMockStoreAndRouter>
    </MockedProvider>,
  );

describe("PLP page", () => {
  it("should show the loader while the products are loading", () => {
    renderPLP([createProductsMock("all")]);

    expect(screen.getByRole("status", { name: "Loading" })).toBeInTheDocument();
  });

  it("should show the 'all' category and its products on the home page", async () => {
    renderPLP([createProductsMock("all")]);

    expect(
      screen.getByRole("heading", { level: 1, name: "all" }),
    ).toBeInTheDocument();
    expect(
      await screen.findByRole("link", { name: "Canada Goose Jacket" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "Sony PlayStation 5" }),
    ).toBeInTheDocument();
    expect(screen.queryByRole("status")).not.toBeInTheDocument();
  });

  it("should query the products of the category taken from the URL", async () => {
    renderPLP([createProductsMock("clothes", [testProducts[0]])], "/clothes");

    expect(
      screen.getByRole("heading", { level: 1, name: "clothes" }),
    ).toBeInTheDocument();
    expect(
      await screen.findByRole("link", { name: "Canada Goose Jacket" }),
    ).toBeInTheDocument();
    expect(
      screen.queryByRole("link", { name: "Sony PlayStation 5" }),
    ).not.toBeInTheDocument();
  });

  it("should show neither the loader nor products when the query fails", async () => {
    renderPLP([
      {
        request: {
          query: PRODUCTS_QUERY,
          variables: { searchedCategory: "all" },
        },
        error: new Error("Network error"),
      },
    ]);

    expect(
      await screen.findByRole("heading", { level: 1, name: "all" }),
    ).toBeInTheDocument();
    await vi.waitFor(() =>
      expect(screen.queryByRole("status")).not.toBeInTheDocument(),
    );
    expect(screen.queryByRole("list")).not.toBeInTheDocument();
  });

  it("should have no accessibility violations once the products are loaded", async () => {
    const { container } = renderPLP([createProductsMock("all")]);

    await screen.findByRole("link", { name: "Canada Goose Jacket" });

    expect(await axe(container)).toHaveNoViolations();
  });
});
