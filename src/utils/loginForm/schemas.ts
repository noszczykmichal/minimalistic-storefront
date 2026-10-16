import * as z from "zod";

import { buildFormValidation, required } from "@/utils/sharedValidation";

export const loginSchema = buildFormValidation(["email"]).extend({
  password: z.string().min(1, required),
});

export type LoginFormOutput = z.output<typeof loginSchema>;
