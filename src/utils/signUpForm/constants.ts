import type { SignUpFormInput } from "@/utils/signUpForm/schema";

interface SignUpFormField {
  label: string;
  name: keyof SignUpFormInput;
  type: "text" | "email" | "password";
  autoComplete: string;
}

const singUpFormConfig = [
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
    label: "E-mail:",
    name: "email",
    type: "email",
    autoComplete: "email",
  },
  {
    label: "Password:",
    name: "password",
    type: "password",
    autoComplete: "new-passord",
  },
  {
    label: "Confirm Password:",
    name: "confirmPassword",
    type: "password",
    autoComplete: "new-password",
  },
] satisfies SignUpFormField[];

export default singUpFormConfig;
