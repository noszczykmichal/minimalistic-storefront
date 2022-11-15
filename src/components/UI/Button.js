import { Component } from "react";
import PropTypes from "prop-types";

import classes from "./Button.module.css";

class Button extends Component {
  render() {
    const { isDisabled, children } = this.props;

    return (
      <button type="button" className={classes.button} disabled={isDisabled}>
        {children}
      </button>
    );
  }
}

Button.propTypes = {
  isDisabled: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
};

export default Button;
