vi.mock("@/hooks/useReduxHooks", async (importActual) => {
  const actual = await importActual<typeof import("@/hooks/useReduxHooks")>();
  return { ...actual, useAppDispatch: vi.fn() };
});

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "vitest-axe";
import configureMockStore from "redux-mock-store";

import Product from "@/components/Products/ProductList/Product/Product";
import WithMockStoreAndRouter from "@/utils/WithMockStoreAndRouter";
import { useAppDispatch } from "@/hooks/useReduxHooks";
import { productActions } from "@/store/products";
import type { ProductType } from "@/types/types";

const testProduct: ProductType = {
  id: "jacket-canada-goosee",
  name: "Jacket",
  brand: "Canada Goose",
  description: "<p>Awesome winter jacket</p>",
  inStock: true,
  gallery: ["https://example.com/jacket.jpg"],
  attributes: [
    {
      name: "Size",
      items: [
        { displayValue: "Small", value: "S" },
        { displayValue: "Medium", value: "M" },
      ],
    },
  ],
  prices: [
    { currency: { label: "USD", symbol: "$" }, amount: 518.47 },
    { currency: { label: "GBP", symbol: "£" }, amount: 372.67 },
  ],
};

const createStore = (billingCurrency = "$") =>
  configureMockStore([])({ products: { billingCurrency } });

const renderProduct = (product = testProduct, billingCurrency = "$") =>
  render(
    <WithMockStoreAndRouter customStore={createStore(billingCurrency)}>
      <ul>
        <Product productDetails={product} />
      </ul>
    </WithMockStoreAndRouter>,
  );

describe("Product component", () => {
  const dispatch = vi.fn();
  const { onCurrentPDPChange, addProductToCart } = productActions;

  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(useAppDispatch).mockReturnValue(dispatch);
  });

  it("should render the product name and its price in the billing currency", () => {
    renderProduct(testProduct, "£");

    const productCard = screen.getByRole("listitem");

    expect(productCard).toHaveTextContent("Canada Goose Jacket");
    expect(productCard).toHaveTextContent("£372.67");
  });

  it("should link to the product page under /all when on the home page", () => {
    renderProduct();

    expect(
      screen.getByRole("link", { name: "Canada Goose Jacket" }),
    ).toHaveAttribute("href", "/all/jacket-canada-goosee");
  });

  it("should link to the product page under the current category", () => {
    render(
      <WithMockStoreAndRouter
        customStore={createStore()}
        initialPath="/clothes"
      >
        <ul>
          <Product productDetails={testProduct} />
        </ul>
      </WithMockStoreAndRouter>,
    );

    expect(
      screen.getByRole("link", { name: "Canada Goose Jacket" }),
    ).toHaveAttribute("href", "/clothes/jacket-canada-goosee");
  });

  it("should save the product as the current PDP when its link is clicked", async () => {
    renderProduct();

    await userEvent.click(
      screen.getByRole("link", { name: "Canada Goose Jacket" }),
    );

    expect(dispatch).toHaveBeenCalledTimes(1);
    expect(dispatch).toHaveBeenCalledWith(onCurrentPDPChange(testProduct));
  });

  it("should add the product to the cart with the first value of each attribute selected", async () => {
    renderProduct();

    await userEvent.click(
      screen.getByRole("button", { name: "Add Canada Goose Jacket to cart" }),
    );

    expect(dispatch).toHaveBeenCalledTimes(1);
    expect(dispatch).toHaveBeenCalledWith(
      addProductToCart({
        ...testProduct,
        attributes: [
          {
            name: "Size",
            items: [
              { displayValue: "Small", value: "S", selected: true },
              { displayValue: "Medium", value: "M" },
            ],
          },
        ],
      }),
    );
  });

  it("should show 'out of stock' and no add to cart button when the product is out of stock", () => {
    renderProduct({ ...testProduct, inStock: false });

    expect(screen.getByText("OUT OF STOCK")).toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: "Add Canada Goose Jacket to cart" }),
    ).not.toBeInTheDocument();
  });

  it("should have no accessibility violations", async () => {
    const { container } = renderProduct();

    expect(await axe(container)).toHaveNoViolations();
  });
});
