import configureStore from "redux-mock-store";

import { CartItem } from "../models/productSlice.models";

export const testItemDetails: CartItem = {
  id: "jacket-canada-goosee",
  name: "Jacket",
  brand: "Canada Goose",
  description: "<p>Awesome winter jacket</p>",
  inStock: true,
  gallery: [
    "https://images.canadagoose.com/image/upload/w_480,c_scale,f_auto,q_auto:best/v1576016105/product-image/2409L_61.jpg",
    "https://images.canadagoose.com/image/upload/w_480,c_scale,f_auto,q_auto:best/v1576016107/product-image/2409L_61_a.jpg",
    "https://images.canadagoose.com/image/upload/w_480,c_scale,f_auto,q_auto:best/v1576016108/product-image/2409L_61_b.jpg",
  ],
  attributes: [
    {
      name: "Size",
      items: [
        {
          displayValue: "Small",
          value: "S",
        },
        {
          displayValue: "Medium",
          value: "M",
          selected: true,
        },
      ],
    },
  ],
  prices: [
    {
      currency: {
        label: "USD",
        symbol: "$",
      },
      amount: 518.47,
    },
    {
      currency: {
        label: "GBP",
        symbol: "£",
      },
      amount: 372.67,
    },
  ],
  quantity: 1,
  internalID: "jacket-canada-gooseem",
};

const testNikeAir = {
  id: "huarache-x-stussy-le",
  name: "Nike Air Huarache Le",
  brand: "Nike x Stussy",
  inStock: true,
  gallery: [
    "https://cdn.shopify.com/s/files/1/0087/6193/3920/products/DD1381200_DEOA_2_720x.jpg?v=1612816087",
    "https://cdn.shopify.com/s/files/1/0087/6193/3920/products/DD1381200_DEOA_1_720x.jpg?v=1612816087",
    "https://cdn.shopify.com/s/files/1/0087/6193/3920/products/DD1381200_DEOA_3_720x.jpg?v=1612816087",
  ],
  description: "<p>Great sneakers for everyday use!</p>",
  attributes: [
    {
      name: "Size",
      items: [
        {
          displayValue: "40",
          value: "40",
          selected: true,
        },
        {
          displayValue: "41",
          value: "41",
        },
      ],
    },
  ],
  prices: [
    {
      currency: {
        label: "USD",
        symbol: "$",
      },
      amount: 144.69,
    },
    {
      currency: {
        label: "GBP",
        symbol: "£",
      },
      amount: 104,
    },
  ],
  quantity: 1,
  internalID: "huarache-x-stussy-le40",
};

export function createTestStore(productsTotalVal: number) {
  const mockStore = configureStore([]);

  return mockStore({
    ui: { isMiniCartOpen: true },
    products: {
      cart: [testItemDetails, testNikeAir],
      productsTotal: productsTotalVal,
      totalPrice: 144.69,
      billingCurrency: "$",
    },
  });
}
