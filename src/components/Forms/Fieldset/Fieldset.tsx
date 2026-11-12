import RadioInput from "@/components/Forms/Inputs/RadioInput/RadioInput";
import classes from "@/components/Forms/Fieldset/Fieldset.module.css";
import { UseFormRegisterReturn } from "react-hook-form";
import { FieldOption } from "@/types/types";

interface FieldsetProps<T extends string> {
  options: FieldOption<T>[];
  legend: string;
  registration: UseFormRegisterReturn;
  error?: string;
}
export default function Fieldset<T extends string>({
  options,
  legend,
  registration,
  error = "",
}: FieldsetProps<T>) {
  return (
    <fieldset className={classes.fieldset} aria-invalid={Boolean(error)}>
      <legend className={classes.fieldset__legend}>{legend}</legend>

      {options.map((option) => (
        <div key={option.name} className={classes["field-wrapper"]}>
          <RadioInput inputDetails={option} registration={registration} />
        </div>
      ))}

      {error && <p className={classes.fieldset__error}>{error}</p>}
    </fieldset>
  );
}
