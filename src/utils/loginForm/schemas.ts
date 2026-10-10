import * as z from "zod";

import buildFormValidation from "@/utils/sharedValidation";

export const fullSchema = buildFormValidation(["email", "password"]);

export type LoginFormOutput = z.output<typeof fullSchema>;
