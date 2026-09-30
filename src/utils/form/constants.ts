import {
  Option,
  PaymentMethod,
  ShippingOptionName,
} from "@/types/productSlice.models";
import { ShippingAddress } from "./schemas";

interface ShippingAddressField {
  label: string;
  name: keyof ShippingAddress;
  type: "text" | "tel" | "email";
  autoComplete: string;
}

export const shippingAddressInputs = [
  {
    label: "First Name:",
    name: "firstName",
    type: "text",
    autoComplete: "given-name",
  },
  {
    label: "Last Name:",
    name: "lastName",
    type: "text",
    autoComplete: "family-name",
  },
  {
    label: "Address Line 1:",
    name: "addressLine1",
    type: "text",
    autoComplete: "address-line1",
  },
  {
    label: "Address Line 2:",
    name: "addressLine2",
    type: "text",
    autoComplete: "address-line2",
  },
  {
    label: "City:",
    name: "city",
    type: "text",
    autoComplete: "address-level2",
  },
  {
    label: "Postal Code:",
    name: "postalCode",
    type: "text",
    autoComplete: "postal-code",
  },
  {
    label: "Country:",
    name: "country",
    type: "text",
    autoComplete: "country-name",
  },
  {
    label: "Phone:",
    name: "phone",
    type: "tel",
    autoComplete: "tel",
  },
  {
    label: "E-mail:",
    name: "email",
    type: "email",
    autoComplete: "email",
  },
] satisfies ShippingAddressField[];

export const shippingOptions: Option<ShippingOptionName>[] = [
  {
    label: "Carrier method: <b>Flat Rate</b> <br>Rate: <b>Fixed</b>",
    name: "flatRate",
    costs: [
      { amount: 5.0, currency: { label: "USD", symbol: "$" } },
      { amount: 3.59, currency: { label: "GBP", symbol: "£" } },
      { amount: 6.49, currency: { label: "AUD", symbol: "A$" } },
      { amount: 539.95, currency: { label: "JPY", symbol: "¥" } },
      { amount: 378.89, currency: { label: "RUB", symbol: "₽" } },
    ],
  },
  {
    label: "Carrier method: <b>Best Way</b> <br>Rate: <b>Table Rate</b>",
    name: "bestWay",
    costs: [
      { amount: 10.0, currency: { label: "USD", symbol: "$" } },
      { amount: 7.19, currency: { label: "GBP", symbol: "£" } },
      { amount: 12.9, currency: { label: "AUD", symbol: "A$" } },
      { amount: 1079.95, currency: { label: "JPY", symbol: "¥" } },
      { amount: 756.29, currency: { label: "RUB", symbol: "₽" } },
    ],
  },
  {
    label: "In-store pickup: <br><b>(online payment)</b>",
    name: "in-store/online_payment",
    costs: [
      { amount: 0, currency: { label: "USD", symbol: "$" } },
      { amount: 0, currency: { label: "GBP", symbol: "£" } },
      { amount: 0, currency: { label: "AUD", symbol: "A$" } },
      { amount: 0, currency: { label: "JPY", symbol: "¥" } },
      { amount: 0, currency: { label: "RUB", symbol: "₽" } },
    ],
  },
  {
    label: "In-store pickup: <br><b>(payment on collection)</b>",
    name: "in-store/payment_on_collection",
    costs: [
      { amount: 0.99, currency: { label: "USD", symbol: "$" } },
      { amount: 0.79, currency: { label: "GBP", symbol: "£" } },
      { amount: 1.29, currency: { label: "AUD", symbol: "A$" } },
      { amount: 106.95, currency: { label: "JPY", symbol: "¥" } },
      { amount: 74.89, currency: { label: "RUB", symbol: "₽" } },
    ],
  },
];

export const paymentOptions: Option<PaymentMethod>[] = [
  {
    label: "<b>Credit card</b>",
    name: "credit_card",
    costs: [
      { amount: 0, currency: { label: "USD", symbol: "$" } },
      { amount: 0, currency: { label: "GBP", symbol: "£" } },
      { amount: 0, currency: { label: "AUD", symbol: "A$" } },
      { amount: 0, currency: { label: "JPY", symbol: "¥" } },
      { amount: 0, currency: { label: "RUB", symbol: "₽" } },
    ],
  },
  {
    label: "<b>Bank transfer</b>",
    name: "bank_transfer",
    costs: [
      { amount: 0, currency: { label: "USD", symbol: "$" } },
      { amount: 0, currency: { label: "GBP", symbol: "£" } },
      { amount: 0, currency: { label: "AUD", symbol: "A$" } },
      { amount: 0, currency: { label: "JPY", symbol: "¥" } },
      { amount: 0, currency: { label: "RUB", symbol: "₽" } },
    ],
  },
  {
    label: "<b>Cash on collection</b>",
    name: "cash_on_collection",
    costs: [
      { amount: 1.99, currency: { label: "USD", symbol: "$" } },
      { amount: 1.49, currency: { label: "GBP", symbol: "£" } },
      { amount: 2.59, currency: { label: "AUD", symbol: "A$" } },
      { amount: 214.9, currency: { label: "JPY", symbol: "¥" } },
      { amount: 150.49, currency: { label: "RUB", symbol: "₽" } },
    ],
  },
];
