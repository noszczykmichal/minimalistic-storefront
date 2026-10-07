import * as z from "zod";

const required = "This field is required.";

const sharedValidation = {
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
  password: z
    .string()
    .trim()
    .min(6, {
      error: "Password must be at least 6 characters.",
      abort: true,
    })
    .regex(
      /^(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).*$/,
      "Password must include an uppercase letter, a number and a special character.",
    ),
} as const;

type SharedField = keyof typeof sharedValidation;

const buildFormValidation = <K extends SharedField>(fields: readonly K[]) => {
  const shape = Object.fromEntries(
    fields.map((field) => [field, sharedValidation[field]]),
  ) as Pick<typeof sharedValidation, K>;

  return z.object(shape);
};

export default buildFormValidation;
