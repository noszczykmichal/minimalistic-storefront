import * as z from "zod";

const fullSchema = z.object({
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
});

export default fullSchema;
