import { Component } from "react";
import PropTypes from "prop-types";

import classes from "./Button.module.css";

class Button extends Component {
  render() {
    const { isDisabled, clicked, customClass, children } = this.props;

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
}

Button.propTypes = {
  isDisabled: PropTypes.bool,
  clicked: PropTypes.func.isRequired,
  customClass: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

Button.defaultProps = {
  isDisabled: false,
};

export default Button;
