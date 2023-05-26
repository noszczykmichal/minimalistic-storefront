export type AttributeItem = {
  displayValue: string;
  value: string;
  selected?: boolean;
};

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
