import productsSlice, { productActions } from "@/store/products";
import type { CartItem, ProductType } from "@/types/types";

type ProductsState = ReturnType<typeof productsSlice.reducer>;

const {
  onCurrencyChange,
  onCurrentPDPChange,
  addProductToCart,
  changeQuantity,
  clearCart,
} = productActions;

const { reducer } = productsSlice;

const jacket: ProductType = {
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
        { displayValue: "Medium", value: "M", selected: true },
      ],
    },
  ],
  prices: [
    { currency: { label: "USD", symbol: "$" }, amount: 518.47 },
    { currency: { label: "GBP", symbol: "£" }, amount: 372.67 },
  ],
};

const airTag: ProductType = {
  id: "apple-airtag",
  name: "AirTag",
  brand: "Apple",
  description: "<p>Tracker</p>",
  inStock: true,
  gallery: ["https://example.com/airtag.jpg"],
  attributes: [],
  prices: [
    { currency: { label: "USD", symbol: "$" }, amount: 120.57 },
    { currency: { label: "GBP", symbol: "£" }, amount: 86.6 },
  ],
};

const withSize = (product: ProductType, sizeValue: string): ProductType => ({
  ...product,
  attributes: product.attributes.map((attribute) => ({
    ...attribute,
    items: attribute.items.map(({ selected, ...item }) =>
      item.value === sizeValue ? { ...item, selected: true } : item,
    ),
  })),
});

const toCartItem = (
  product: ProductType,
  quantity: number,
  internalID: string,
): CartItem => ({ ...product, quantity, internalID });

const createState = (
  overrides: Partial<ProductsState> = {},
): ProductsState => ({
  ...reducer(undefined, { type: "@@INIT" }),
  ...overrides,
});

describe("products slice", () => {
  it("should start with an empty cart, '$' as the billing currency and no current PDP", () => {
    expect(reducer(undefined, { type: "@@INIT" })).toEqual({
      billingCurrency: "$",
      currentPDP: null,
      cart: [],
      productsTotal: 0,
      totalPrice: 0,
    });
  });

  describe("onCurrentPDPChange", () => {
    it("should store the given product as the current PDP", () => {
      const state = reducer(createState(), onCurrentPDPChange(jacket));

      expect(state.currentPDP).toEqual(jacket);
    });
  });

  describe("addProductToCart", () => {
    it("should add a new cart line with quantity 1 and an internalID built from the id and the selected values", () => {
      const state = reducer(createState(), addProductToCart(jacket));

      expect(state.cart).toEqual([
        toCartItem(jacket, 1, "jacket-canada-gooseem"),
      ]);
      expect(state.productsTotal).toBe(1);
      expect(state.totalPrice).toBeCloseTo(518.47);
    });

    it("should use the product id as the internalID when the product has no attributes", () => {
      const state = reducer(createState(), addProductToCart(airTag));

      expect(state.cart[0].internalID).toBe("apple-airtag");
    });

    it("should increase the quantity of an existing line when the same product with the same options is added", () => {
      const state = [jacket, jacket].reduce(
        (currentState, product) =>
          reducer(currentState, addProductToCart(product)),
        createState(),
      );

      expect(state.cart).toHaveLength(1);
      expect(state.cart[0].quantity).toBe(2);
      expect(state.productsTotal).toBe(2);
      expect(state.totalPrice).toBeCloseTo(1036.94);
    });

    it("should add a separate line when the same product is added with different options", () => {
      const state = [withSize(jacket, "M"), withSize(jacket, "S")].reduce(
        (currentState, product) =>
          reducer(currentState, addProductToCart(product)),
        createState(),
      );

      expect(state.cart.map((item) => item.internalID)).toEqual([
        "jacket-canada-gooseem",
        "jacket-canada-goosees",
      ]);
      expect(state.productsTotal).toBe(2);
    });

    it("should price the cart in the current billing currency", () => {
      const state = reducer(
        createState({ billingCurrency: "£" }),
        addProductToCart(airTag),
      );

      expect(state.totalPrice).toBeCloseTo(86.6);
    });

    it("should not mutate the previous state", () => {
      const previousState = createState({
        cart: [toCartItem(jacket, 1, "jacket-canada-gooseem")],
        productsTotal: 1,
        totalPrice: 518.47,
      });
      const snapshot = structuredClone(previousState);

      reducer(previousState, addProductToCart(jacket));

      expect(previousState).toEqual(snapshot);
    });
  });

  describe("changeQuantity", () => {
    const cartState = () =>
      createState({
        cart: [
          toCartItem(jacket, 2, "jacket-canada-gooseem"),
          toCartItem(airTag, 1, "apple-airtag"),
        ],
        productsTotal: 3,
        totalPrice: 1157.51,
      });

    it("should increase the quantity of the given line and recompute the totals", () => {
      const state = reducer(
        cartState(),
        changeQuantity({
          internalID: "apple-airtag",
          operationType: "addition",
        }),
      );

      expect(state.cart[1].quantity).toBe(2);
      expect(state.productsTotal).toBe(4);
      expect(state.totalPrice).toBeCloseTo(1278.08);
    });

    it("should decrease the quantity of the given line and recompute the totals", () => {
      const state = reducer(
        cartState(),
        changeQuantity({
          internalID: "jacket-canada-gooseem",
          operationType: "subtraction",
        }),
      );

      expect(state.cart[0].quantity).toBe(1);
      expect(state.productsTotal).toBe(2);
      expect(state.totalPrice).toBeCloseTo(639.04);
    });

    it("should remove the line when its quantity drops to 0", () => {
      const state = reducer(
        cartState(),
        changeQuantity({
          internalID: "apple-airtag",
          operationType: "subtraction",
        }),
      );

      expect(state.cart.map((item) => item.internalID)).toEqual([
        "jacket-canada-gooseem",
      ]);
      expect(state.productsTotal).toBe(2);
      expect(state.totalPrice).toBeCloseTo(1036.94);
    });

    it("should not mutate the previous state", () => {
      const previousState = cartState();
      const snapshot = structuredClone(previousState);

      reducer(
        previousState,
        changeQuantity({
          internalID: "apple-airtag",
          operationType: "addition",
        }),
      );

      expect(previousState).toEqual(snapshot);
    });
  });

  describe("onCurrencyChange", () => {
    it("should change the billing currency and reprice the cart in it", () => {
      const state = reducer(
        createState({
          cart: [
            toCartItem(jacket, 2, "jacket-canada-gooseem"),
            toCartItem(airTag, 1, "apple-airtag"),
          ],
          productsTotal: 3,
          totalPrice: 1157.51,
        }),
        onCurrencyChange("£"),
      );

      expect(state.billingCurrency).toBe("£");
      expect(state.totalPrice).toBeCloseTo(2 * 372.67 + 86.6);
      expect(state.productsTotal).toBe(3);
    });

    it("should set a total of 0 when the cart is empty", () => {
      const state = reducer(createState(), onCurrencyChange("£"));

      expect(state.billingCurrency).toBe("£");
      expect(state.totalPrice).toBe(0);
    });
  });

  describe("clearCart", () => {
    it("should empty the cart and reset the totals but keep the currency and the current PDP", () => {
      const state = reducer(
        createState({
          billingCurrency: "£",
          currentPDP: jacket,
          cart: [toCartItem(jacket, 2, "jacket-canada-gooseem")],
          productsTotal: 2,
          totalPrice: 745.34,
        }),
        clearCart(),
      );

      expect(state).toEqual({
        billingCurrency: "£",
        currentPDP: jacket,
        cart: [],
        productsTotal: 0,
        totalPrice: 0,
      });
    });
  });
});
