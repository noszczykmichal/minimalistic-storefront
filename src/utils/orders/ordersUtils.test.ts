import buildOrderObject from "@/utils/orders/ordersUtils";
import { testItemDetails } from "@/utils/testUtils";
import type { CartItem } from "@/types/types";
import type { ShippingAddress } from "@/utils/shippingForm/schemas";

const address: ShippingAddress = {
  firstName: "Jane",
  lastName: "Doe",
  addressLine1: "Main St 1",
  addressLine2: "Apt 2",
  city: "Warsaw",
  postalCode: "00-001",
  country: "Poland",
  phone: "123456789",
  email: "jane@example.com",
};

const sneakers: CartItem = {
  ...testItemDetails,
  id: "sneakers",
  name: "Sneakers",
  quantity: 3,
  internalID: "sneakers42#ffffff",
  attributes: [
    {
      name: "Size",
      items: [
        { displayValue: "41", value: "41" },
        { displayValue: "42", value: "42", selected: true },
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
};

const buildOrder = (cart: CartItem[]) =>
  buildOrderObject({
    cart,
    billingCurrency: { label: "GBP", symbol: "£" },
    address,
    shippingMethod: "bestWay",
    paymentMethod: "credit_card",
  });

describe("buildOrderObject", () => {
  it("should build the order payload from the cart, currency, address and methods", () => {
    expect(buildOrder([testItemDetails])).toEqual({
      products: [
        {
          productId: "jacket-canada-goosee",
          quantity: 1,
          attributes: [{ name: "Size", value: "M" }],
        },
      ],
      billingCurrency: "GBP",
      address,
      shippingMethod: "bestWay",
      paymentMethod: "credit_card",
    });
  });

  it("should keep every cart line with its quantity and only the selected value of each attribute", () => {
    const { products } = buildOrder([testItemDetails, sneakers]);

    expect(products).toEqual([
      {
        productId: "jacket-canada-goosee",
        quantity: 1,
        attributes: [{ name: "Size", value: "M" }],
      },
      {
        productId: "sneakers",
        quantity: 3,
        attributes: [
          { name: "Size", value: "42" },
          { name: "Color", value: "#FFFFFF" },
        ],
      },
    ]);
  });

  it("should send an empty attribute list for a product without attributes", () => {
    const giftCard: CartItem = {
      ...testItemDetails,
      id: "gift-card",
      attributes: [],
    };

    expect(buildOrder([giftCard]).products).toEqual([
      { productId: "gift-card", quantity: 1, attributes: [] },
    ]);
  });

  it("should return no products for an empty cart", () => {
    expect(buildOrder([]).products).toEqual([]);
  });

  it("should throw when an attribute of a cart item has no selected value", () => {
    const noColorSelected: CartItem = {
      ...sneakers,
      attributes: [
        sneakers.attributes[0],
        {
          name: "Color",
          items: [
            { displayValue: "Green", value: "#44FF03" },
            { displayValue: "White", value: "#FFFFFF" },
          ],
        },
      ],
    };

    expect(() => buildOrder([testItemDetails, noColorSelected])).toThrow(
      "Missing selected Color for product sneakers",
    );
  });
});
