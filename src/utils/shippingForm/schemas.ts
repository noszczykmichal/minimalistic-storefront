import { z } from "zod";
import { PAYMENT_METHODS } from "@/types/types";
import { SHIPPING_FORM } from "./currencies";
import buildFormValidation from "../sharedValidation";

export const shippingAddressSchema = buildFormValidation([
  "firstName",
  "lastName",
  "addressLine1",
  "addressLine2",
  "city",
  "postalCode",
  "country",
  "phone",
  "email",
]);

const shippingMethodAndPayment = z.object({
  shippingOption: z.string("Choose a shipping method.").pipe(
    z.enum(SHIPPING_FORM, {
      error: "Choose a shipping method.",
    }),
  ),

  paymentMethod: z
    .string("Choose a payment method.")
    .pipe(z.enum(PAYMENT_METHODS, { error: "Choose a payment method." })),
});

export const fullSchema = z.object({
  ...shippingAddressSchema.shape,
  ...shippingMethodAndPayment.shape,
});

export const stepFieldNames = [
  shippingAddressSchema.keyof().options,
  shippingMethodAndPayment.keyof().options,
] as const;

export type AddressAndPaymentFormInput = z.input<typeof fullSchema>;
export type AddressAndPaymentFormValues = z.output<typeof fullSchema>;

export type FormFieldName = keyof AddressAndPaymentFormInput;

export const isFormFieldName = (name: string): name is FormFieldName =>
  name in fullSchema.shape;
