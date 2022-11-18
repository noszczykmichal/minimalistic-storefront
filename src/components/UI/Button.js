import { Component } from "react";
import PropTypes from "prop-types";

import classes from "./Button.module.css";

class Button extends Component {
  render() {
    const { isDisabled, clicked, children } = this.props;

    return (
      <button
        type="button"
        className={classes.button}
        onClick={clicked}
        disabled={isDisabled}
      >
        {children}
      </button>
    );
  }
}

Button.propTypes = {
  isDisabled: PropTypes.bool.isRequired,
  clicked: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

export default Button;
