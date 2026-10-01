import { Fragment } from "react";

import RadioInput from "@/components/Forms/Inputs/RadioInput/RadioInput";
import Hr from "@/components/UI/Hr/Hr";
import classes from "@/components/Forms/Fieldset/Fieldset.module.css";
import { UseFormRegisterReturn } from "react-hook-form";
import { Option } from "@/types/types";

interface FieldsetProps<T extends string> {
  options: Option<T>[];
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
      <Hr customClass={classes.fieldset__hr} />
      {options.map((option) => (
        <Fragment key={option.name}>
          <RadioInput inputDetails={option} registration={registration} />
          <Hr customClass={classes.fieldset__hr} />
        </Fragment>
      ))}

      {error && <p className={classes.fieldset__error}>{error}</p>}
    </fieldset>
  );
}
