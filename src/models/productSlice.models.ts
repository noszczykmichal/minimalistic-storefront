export interface AttributeItem {
  displayValue: string;
  value: string;
}

export interface AttributeItemSelectable extends AttributeItem {
  selected?: boolean;
}

export type Currency = {
  label: string;
  symbol: string;
};

export type Price = {
  amount: number;
  currency: Currency;
};

export type ProductAttribute = {
  items: AttributeItem[];
  name: string;
};

export type CartItemAttribute = {
  items: AttributeItemSelectable[];
  name: string;
};

export interface Product {
  brand: string;
  description: string;
  gallery: string[];
  id: string;
  inStock: boolean;
  name: string;
  prices: Price[];
}

export interface CurrentPDP extends Product {
  attributes: ProductAttribute[];
}

export interface CartItem extends Product {
  attributes: CartItemAttribute[];
  quantity: number;
  internalID: string;
}
