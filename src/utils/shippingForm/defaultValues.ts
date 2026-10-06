import { AddressAndPaymentFormInput } from "./schemas";

const defaultShippingAndPaymentData = {
  firstName: "",
  lastName: "",
  addressLine1: "",
  addressLine2: "",
  city: "",
  postalCode: "",
  country: "",
  phone: "",
  email: "",
  shippingOption: "",
  paymentMethod: "",
} satisfies AddressAndPaymentFormInput;

export default defaultShippingAndPaymentData;
