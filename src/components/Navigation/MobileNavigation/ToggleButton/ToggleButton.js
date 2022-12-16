import { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import classes from "./ToggleButton.module.css";

class ToggleButton extends Component {
  onToggleButtonClick = () => {
    const {
      backdropVisibilityToggle,
      backdropTypeToggle,
      miniCartVisibilityToggle,
      mobileNavVisibilityToggle,
    } = this.props;
    backdropVisibilityToggle(true);
    backdropTypeToggle(false);
    miniCartVisibilityToggle(false);
    mobileNavVisibilityToggle(true);
  };

  render() {
    return (
      <button
        type="button"
        className={classes.toggle}
        onClick={this.onToggleButtonClick}
      >
        <div className={classes.toggle__bar} />
        <div className={classes.toggle__bar} />
        <div className={classes.toggle__bar} />
      </button>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    backdropVisibilityToggle: (isOpen) =>
      dispatch({ type: "ui/backdropVisibilityToggle", payload: isOpen }),
    backdropTypeToggle: (isBackdropTransparent) =>
      dispatch({
        type: "ui/backdropTypeToggle",
        payload: isBackdropTransparent,
      }),
    miniCartVisibilityToggle: (isOpen) =>
      dispatch({ type: "ui/miniCartVisibilityToggle", payload: isOpen }),
    mobileNavVisibilityToggle: (isOpen) =>
      dispatch({ type: "ui/mobileNavVisibilityToggle", payload: isOpen }),
  };
};

ToggleButton.propTypes = {
  backdropVisibilityToggle: PropTypes.func.isRequired,
  backdropTypeToggle: PropTypes.func.isRequired,
  miniCartVisibilityToggle: PropTypes.func.isRequired,
  mobileNavVisibilityToggle: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(ToggleButton);
