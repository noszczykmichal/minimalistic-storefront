import { ReactNode } from "react";

import classes from "./Button.module.css";

function Button({
  customClass,
  children,
  isDisabled,
  clicked,
}: {
  customClass: string;
  children: ReactNode;
  isDisabled?: boolean;
  clicked?: () => void;
}) {
  return (
    <button
      type="button"
      className={[classes.button, customClass].join(" ")}
      onClick={clicked}
      disabled={isDisabled}
    >
      {children}
    </button>
  );
}

Button.defaultProps = {
  isDisabled: false,
  clicked: () => {},
};

export default Button;
