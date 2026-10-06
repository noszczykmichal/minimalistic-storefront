import {
  SHIPPING_FORM,
  CURRENCY_LABELS,
  CURRENCY_SYMBOLS,
} from "@/utils/shippingForm/currencies";

export type AttributeItem = {
  displayValue: string;
  value: string;
  selected?: boolean;
};

export type Currency = {
  [L in CurrencyLabel]: { label: L; symbol: (typeof CURRENCY_SYMBOLS)[L] };
}[CurrencyLabel];

export type Price = {
  amount: number;
  currency: Currency;
};

export type ProductAttribute = {
  items: AttributeItem[];
  name: string;
};

export const PAYMENT_METHODS = [
  "credit_card",
  "bank_transfer",
  "cash_on_collection",
] as const;

export type ShippingOptionName = (typeof SHIPPING_FORM)[number];
export type CurrencyLabel = (typeof CURRENCY_LABELS)[number];
export type PaymentMethod = (typeof PAYMENT_METHODS)[number];

export interface Cost {
  amount: number;
  currency: Currency;
}

export interface Option<T> {
  label: string;
  name: T;
  costs: Cost[];
}

export interface ProductType {
  attributes: ProductAttribute[];
  brand: string;
  description: string;
  gallery: string[];
  id: string;
  inStock: boolean;
  name: string;
  prices: Price[];
}

export interface CartItem extends ProductType {
  quantity: number;
  internalID: string;
}

export type ChangeQuantityVariants = "addition" | "subtraction";

export type ThumbnailArrowVariant = "right" | "left";

export interface AttributeVariantInterface {
  displayValue: string;
  selected?: boolean;
  value: string;
}

const isCurrencyLabel = (label: string): label is CurrencyLabel =>
  (CURRENCY_LABELS as readonly string[]).includes(label);

export const isCurrency = (currency: {
  label: string;
  symbol: string;
}): currency is Currency =>
  isCurrencyLabel(currency.label) &&
  CURRENCY_SYMBOLS[currency.label] === currency.symbol;

export type BackdropMode = "light" | "dark";
