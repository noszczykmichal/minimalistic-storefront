import type { PaymentMethodName, ShippingOptionName } from "@/types/types";
import { AddressAndPaymentFormInput } from "@/utils/shippingForm/schemas";

interface ShippingAddressField {
  label: string;
  name: keyof AddressAndPaymentFormInput;
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

export const shippingOptionsLabels: Record<ShippingOptionName, string> = {
  flatRate: "Carrier method: <b>Flat Rate</b> <br>Rate: <b>Fixed</b>",
  bestWay: "Carrier method: <b>Best Way</b> <br>Rate: <b>Table Rate</b>",
  "in-store/online_payment": "In-store pickup: <br><b>(online payment)</b>",
  "in-store/payment_on_collection":
    "In-store pickup: <br><b>(payment on collection)</b>",
};

export const paymentOptionsLabels: Record<PaymentMethodName, string> = {
  credit_card: "<b>Credit card</b>",
  bank_transfer: "<b>Bank transfer</b>",
  cash_on_collection: "<b>Cash on collection</b>",
};
