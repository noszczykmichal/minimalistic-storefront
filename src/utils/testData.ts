/* eslint-disable import/prefer-default-export */
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
