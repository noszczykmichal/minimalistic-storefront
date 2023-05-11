import PropTypes from "prop-types";

import classes from "./Button.module.css";

function Button({ isDisabled, clicked, customClass, children }) {
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

Button.propTypes = {
  isDisabled: PropTypes.bool,
  clicked: PropTypes.func,
  customClass: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

Button.defaultProps = {
  isDisabled: false,
  clicked: () => {},
};

export default Button;
