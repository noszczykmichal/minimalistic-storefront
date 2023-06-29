import classes from "./Input.module.css";
import { formActions } from "../../store/formSlice";
import { useAppDispatch } from "../../hooks/useReduxHooks";

interface InputProps {
  label: string;
  name: string;
  type: string;
}

function Input({ inputDetails }: { inputDetails: InputProps }) {
  // hasFNameError && <p>This value should be valid</p> to do pociągnięcia z reduxa
  const { label, name, type } = inputDetails;
  const { registerInput } = formActions;
  const dispatch = useAppDispatch();

  dispatch(registerInput(name));

  return (
    <div className={classes["form-control"]}>
      <label htmlFor={name}>
        {label}
        <input type={type} name={name} />
      </label>
    </div>
  );
}

export default Input;
