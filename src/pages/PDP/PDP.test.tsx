import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "vitest-axe";
import configureMockStore from "redux-mock-store";

import PDP from "@/pages/PDP/PDP";
import WithMockStoreAndRouter from "@/utils/WithMockStoreAndRouter";
import { productActions } from "@/store/products";
import { uiActions } from "@/store/uiSlice";
import type { ProductType } from "@/types/types";

const testProduct: ProductType = {
  id: "test-sneakers",
  name: "Sneakers",
  brand: "Test Brand",
  description: "<p>Comfortable shoes</p>",
  inStock: true,
  gallery: ["https://example.com/sneakers-1.jpg"],
  attributes: [
    {
      name: "Size",
      items: [
        { displayValue: "40", value: "40" },
        { displayValue: "41", value: "41" },
      ],
    },
    {
      name: "Color",
      items: [
        { displayValue: "Green", value: "#44FF03" },
        { displayValue: "White", value: "#FFFFFF" },
      ],
    },
  ],
  prices: [{ currency: { label: "USD", symbol: "$" }, amount: 99.99 }],
};

const renderPDP = () => {
  const store = configureMockStore([])({
    products: { currentPDP: testProduct, billingCurrency: "$" },
    ui: { isModalOpen: false },
  });

  const utils = render(
    <WithMockStoreAndRouter customStore={store}>
      <PDP />
    </WithMockStoreAndRouter>,
  );

  return { ...utils, store };
};

describe("PDP page", () => {
  let modalsRoot: HTMLDivElement;

  beforeEach(() => {
    modalsRoot = document.createElement("div");
    modalsRoot.id = "modals-root";
    document.body.appendChild(modalsRoot);
  });

  afterEach(() => {
    modalsRoot.remove();
  });

  it("should render each attribute as a labelled group of unpressed buttons", () => {
    renderPDP();

    const sizeGroup = screen.getByRole("group", { name: "Size:" });
    const colorGroup = screen.getByRole("group", { name: "Color:" });

    expect(within(sizeGroup).getAllByRole("button")).toHaveLength(2);
    expect(within(colorGroup).getAllByRole("button")).toHaveLength(2);
    expect(screen.queryAllByRole("button", { pressed: true })).toHaveLength(0);
  });

  it("should mark only the clicked button as pressed within its group", async () => {
    renderPDP();
    const sizeGroup = screen.getByRole("group", { name: "Size:" });
    const size40 = within(sizeGroup).getByRole("button", { name: "40" });
    const size41 = within(sizeGroup).getByRole("button", { name: "41" });

    await userEvent.click(size40);

    expect(size40).toHaveAttribute("aria-pressed", "true");
    expect(size41).toHaveAttribute("aria-pressed", "false");

    await userEvent.click(size41);

    expect(size40).toHaveAttribute("aria-pressed", "false");
    expect(size41).toHaveAttribute("aria-pressed", "true");
  });

  it("should name colour buttons by their display value and keep groups independent", async () => {
    renderPDP();

    await userEvent.click(screen.getByRole("button", { name: "40" }));
    await userEvent.click(screen.getByRole("button", { name: "Green" }));

    expect(screen.getByRole("button", { name: "40" })).toHaveAttribute(
      "aria-pressed",
      "true",
    );
    expect(screen.getByRole("button", { name: "Green" })).toHaveAttribute(
      "aria-pressed",
      "true",
    );
    expect(screen.getByRole("button", { name: "White" })).toHaveAttribute(
      "aria-pressed",
      "false",
    );
  });

  it("should add the product with the selected attributes to the cart", async () => {
    const { store } = renderPDP();

    await userEvent.click(screen.getByRole("button", { name: "41" }));
    await userEvent.click(screen.getByRole("button", { name: "White" }));
    await userEvent.click(screen.getByRole("button", { name: "Add to cart" }));

    expect(store.getActions()).toEqual([
      productActions.addProductToCart({
        ...testProduct,
        attributes: [
          {
            name: "Size",
            items: [
              { displayValue: "40", value: "40" },
              { displayValue: "41", value: "41", selected: true },
            ],
          },
          {
            name: "Color",
            items: [
              { displayValue: "Green", value: "#44FF03" },
              { displayValue: "White", value: "#FFFFFF", selected: true },
            ],
          },
        ],
      }),
    ]);
  });

  it("should open the modal instead of adding to cart when an attribute is not selected", async () => {
    const { store } = renderPDP();

    await userEvent.click(screen.getByRole("button", { name: "40" }));
    await userEvent.click(screen.getByRole("button", { name: "Add to cart" }));

    expect(store.getActions()).toEqual([uiActions.modalToggle(true)]);
  });

  it("should have no accessibility violations after a selection", async () => {
    const { container } = renderPDP();

    await userEvent.click(screen.getByRole("button", { name: "40" }));

    expect(await axe(container)).toHaveNoViolations();
  });
});
