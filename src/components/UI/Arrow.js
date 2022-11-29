import { Component } from "react";
import PropTypes from "prop-types";

import classes from "./Arrow.module.css";

class Arrow extends Component {
  render() {
    const { variant, clicked } = this.props;
    const attachedClass =
      variant === "left" ? classes["button--left"] : classes["button--right"];
    return (
      <button
        type="button"
        className={[classes.button, attachedClass].join(" ")}
        onClick={clicked}
      >
        <svg
          width="8"
          height="14"
          viewBox="0 0 8 14"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M7.25 1.06857L1.625 6.6876L7.25 12.3066"
            stroke="white"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    );
  }
}

Arrow.propTypes = {
  variant: PropTypes.string.isRequired,
  clicked: PropTypes.func.isRequired,
};

export default Arrow;
