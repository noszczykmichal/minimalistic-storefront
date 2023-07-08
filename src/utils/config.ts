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
  lengthErrorMessage: "Please enter at least for 4 characters.",
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
    label: "Carrier method: <b>Flat Rate</b> <br>Rate: <b>Fixed-US$5.00</b>",
    name: "flatRate",
    shipping: [
      { amount: 5.0, currency: { label: "USD", symbol: "$" } },
      { amount: 3.59, currency: { label: "GBP", symbol: "£" } },
      { amount: 6.49, currency: { label: "AUD", symbol: "A$" } },
      { amount: 539.95, currency: { label: "JPY", symbol: "¥" } },
      { amount: 378.89, currency: { label: "RUB", symbol: "₽" } },
    ],
  },
  {
    label:
      "Carrier method: <b>Best Way</b> <br>Rate: <b>Table Rate-US$10.00</b>",
    name: "bestWay",
    shipping: [
      { amount: 10.0, currency: { label: "USD", symbol: "$" } },
      { amount: 7.19, currency: { label: "GBP", symbol: "£" } },
      { amount: 12.9, currency: { label: "AUD", symbol: "A$" } },
      { amount: 1079.95, currency: { label: "JPY", symbol: "¥" } },
      { amount: 756.29, currency: { label: "RUB", symbol: "₽" } },
    ],
  },
];
