export const SHIPPING_FORM = [
  "flatRate",
  "bestWay",
  "in-store/online_payment",
  "in-store/payment_on_collection",
] as const;

export const CURRENCY_LABELS = ["USD", "GBP", "AUD", "JPY", "RUB"] as const;
export const CURRENCY_SYMBOLS = {
  USD: "$",
  GBP: "£",
  AUD: "A$",
  JPY: "¥",
  RUB: "₽",
} as const satisfies Record<(typeof CURRENCY_LABELS)[number], string>;
