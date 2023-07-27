const validators = {
  stringValidator: (text: string) => {
    return text.trim().length >= 4;
  },
  phoneValidator: (text: string) => {
    return text.trim().length >= 9;
  },
  emailValidator: (text: string) => {
    return text.trim().includes("@");
  },
};

const errorMessages = {
  lengthErrorMessage: "Please enter at least 4 characters.",
  telErrorMessage:
    "A correct phone number should consist of at least 9 digits.",
  emailErrorMessage: "Please enter a value in the format: example@domain.com.",
};

export const shippingAddressInputs = [
  {
    label: "First Name:",
    name: "fName",
    type: "text",
    errorMessage: errorMessages.lengthErrorMessage,
    validator: validators.stringValidator,
  },
  {
    label: "Last Name:",
    name: "lName",
    type: "text",
    errorMessage: errorMessages.lengthErrorMessage,
    validator: validators.stringValidator,
  },
  {
    label: "Address Line 1:",
    name: "address_1",
    type: "text",
    errorMessage: errorMessages.lengthErrorMessage,
    validator: validators.stringValidator,
  },
  {
    label: "Address Line 2:",
    name: "address_2",
    type: "text",
    errorMessage: errorMessages.lengthErrorMessage,
    validator: validators.stringValidator,
  },
  {
    label: "City:",
    name: "city",
    type: "text",
    errorMessage: errorMessages.lengthErrorMessage,
    validator: validators.stringValidator,
  },
  {
    label: "Postal Code:",
    name: "postal_code",
    type: "text",
    errorMessage: errorMessages.lengthErrorMessage,
    validator: validators.stringValidator,
  },
  {
    label: "Country:",
    name: "country",
    type: "text",
    errorMessage: errorMessages.lengthErrorMessage,
    validator: validators.stringValidator,
  },
  {
    label: "Phone:",
    name: "phone",
    type: "tel",
    errorMessage: errorMessages.telErrorMessage,
    validator: validators.phoneValidator,
  },
  {
    label: "E-mail:",
    name: "email",
    type: "email",
    errorMessage: errorMessages.emailErrorMessage,
    validator: validators.emailValidator,
  },
];

export const shippingOptions = [
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

export const paymentOptions = [
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
