import { ReactNode } from "react";

import classes from "./Button.module.css";

function Button({
  isDisabled = false,
  clicked,
  customClass,
  children,
}: {
  isDisabled?: boolean;
  clicked?: () => void;
  customClass: string;
  children: ReactNode;
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
