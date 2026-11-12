import { legacy_configureStore as configureStore } from "redux-mock-store";
import { ReactElement } from "react";
import { setupStore, type RootState, type AppStore } from "@/store/store";
import type {
  ProductType,
  CartItem,
  FieldOption,
  PaymentMethodName,
  ShippingOptionName,
} from "@/types/types";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router";
import { render } from "@testing-library/react";

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

const testShippingPaymentOptions = {
  isFormValid: true,
  inputs: {
    shippingOption: {
      value: "bestWay",
      cost: 10,
      isSelected: true,
    },
    paymentOption: {
      value: "bank_transfer",
      cost: 0,
      isSelected: true,
    },
  },
};

export const testProduct: ProductType = {
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
  prices: [
    { currency: { label: "USD", symbol: "$" }, amount: 99.99 },
    { currency: { label: "GBP", symbol: "£" }, amount: 69.99 },
  ],
};

export const shippingOptions: FieldOption<ShippingOptionName>[] = [
  {
    name: "bestWay",
    costs: [
      {
        amount: 10,
        currency: {
          label: "USD",
          symbol: "$",
        },
      },
      {
        amount: 7.19,
        currency: {
          label: "GBP",
          symbol: "£",
        },
      },
      {
        amount: 12.9,
        currency: {
          label: "AUD",
          symbol: "A$",
        },
      },
      {
        amount: 1079.95,
        currency: {
          label: "JPY",
          symbol: "¥",
        },
      },
      {
        amount: 756.29,
        currency: {
          label: "RUB",
          symbol: "₽",
        },
      },
    ],
    label: "Carrier method: <b>Best Way</b> <br>Rate: <b>Table Rate</b>",
  },
];

export const paymentOptions: FieldOption<PaymentMethodName>[] = [
  {
    name: "cash_on_collection",
    costs: [
      {
        amount: 1.99,
        currency: {
          label: "USD",
          symbol: "$",
        },
      },
      {
        amount: 1.49,
        currency: {
          label: "GBP",
          symbol: "£",
        },
      },
      {
        amount: 2.59,
        currency: {
          label: "AUD",
          symbol: "A$",
        },
      },
      {
        amount: 214.9,
        currency: {
          label: "JPY",
          symbol: "¥",
        },
      },
      {
        amount: 150.49,
        currency: {
          label: "RUB",
          symbol: "₽",
        },
      },
    ],
    label: "<b>Cash on collection</b>",
  },
  {
    name: "credit_card",
    costs: [
      {
        amount: 0,
        currency: {
          label: "USD",
          symbol: "$",
        },
      },
      {
        amount: 0,
        currency: {
          label: "GBP",
          symbol: "£",
        },
      },
      {
        amount: 0,
        currency: {
          label: "AUD",
          symbol: "A$",
        },
      },
      {
        amount: 0,
        currency: {
          label: "JPY",
          symbol: "¥",
        },
      },
      {
        amount: 0,
        currency: {
          label: "RUB",
          symbol: "₽",
        },
      },
    ],
    label: "<b>Credit card</b>",
  },
];

export function createTestStore(
  productsTotalVal: number = 2,
  shippingPaymentOptionsValue = testShippingPaymentOptions,
) {
  const mockStore = configureStore([]);

  return mockStore({
    ui: { isMiniCartOpen: true },
    products: {
      cart: [testItemDetails, testNikeAir],
      productsTotal: productsTotalVal,
      totalPrice: 144.69,
      billingCurrency: { label: "USD", symbol: "$" },
    },
    shippingAddressAndPayment: shippingPaymentOptionsValue,
  });
}

export function renderWithProviders(
  ui: ReactElement,
  {
    preloadedState,
    store = setupStore(preloadedState),
    initialPath = "/",
  }: {
    preloadedState?: Partial<RootState>;
    store?: AppStore;
    initialPath?: string;
  } = {},
) {
  return {
    store,
    ...render(
      <Provider store={store}>
        <MemoryRouter initialEntries={[initialPath]}>{ui}</MemoryRouter>
      </Provider>,
    ),
  };
}
