import { SignUpFormInput } from "./schema";

const defaultValues = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
} satisfies SignUpFormInput;

export default defaultValues;
