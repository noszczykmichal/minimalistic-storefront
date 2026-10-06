import * as z from "zod";

import buildFormValidation from "@/utils/sharedValidation";

export const baseSchema = buildFormValidation([
  "firstName",
  "lastName",
  "email",
  "password",
]).extend({
  confirmPassword: z.string().min(1, "Please confirm your password."),
});

export const fullSchema = baseSchema.refine(
  (data) => data.password === data.confirmPassword,
  { path: ["confirmPassword"], message: "Passwords don't match." },
);

export type SignUpFormInput = z.input<typeof fullSchema>;
