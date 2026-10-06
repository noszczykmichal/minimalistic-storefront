import { z } from "zod";
import { PAYMENT_METHODS } from "@/types/types";
import { SHIPPING_FORM } from "./currencies";

const required = "This field is required.";

export const shippingAddressSchema = z.object({
  firstName: z.string().trim().min(1, required),
  lastName: z.string().trim().min(1, required),
  addressLine1: z.string().trim().min(3, "Please enter at least 3 characters."),
  addressLine2: z.string().trim().optional(),
  city: z.string().trim().min(2, "Please enter at least 2 characters."),
  postalCode: z
    .string()
    .trim()
    .min(3, "Please enter a valid postal code.")
    .max(10, "Please enter a valid postal code."),
  country: z.string().min(1, "Please enter a country."),
  phone: z
    .string()
    .trim()
    .regex(/^\+?[0-9\s-]{7,13}$/, "Please enter a valid phone number."),
  email: z.string().trim().pipe(z.email("Please enter a valid email address.")),
});

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
