import { UseFormRegisterReturn } from "react-hook-form";

import classes from "@/components/Forms/Inputs/TextInput/TextInput.module.css";

interface TextInputProps {
  label: string;
  type: "text" | "tel" | "email";
  autoComplete: string;
  registration: UseFormRegisterReturn;
  error?: string;
}

export default function TextInput({
  label,
  type,
  autoComplete,
  registration,
  error = "",
}: TextInputProps) {
  const attachedClasses = error
    ? [classes["form-control__input"], classes["form-control__input--hasError"]]
    : [classes["form-control__input"]];

  return (
    <div className={classes["form-control"]}>
      <label htmlFor={registration.name}>
        {label}
        <input
          type={type}
          className={attachedClasses.join(" ")}
          aria-invalid={Boolean(error)}
          autoComplete={autoComplete}
          {...registration}
        />
      </label>
      {error && <p className={classes["form-control__message"]}>{error}</p>}
    </div>
  );
}
