import { Component } from "react";
import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import classes from "./NavigationItem.module.css";

class NavigationItem extends Component {
  onNavLinkClickHandler = () => {
    const {
      backdropVisibilityToggle,
      currencySwitcherVisibToggle,
      miniCartVisibilityToggle,
    } = this.props;
    backdropVisibilityToggle(false);
    currencySwitcherVisibToggle(false);
    miniCartVisibilityToggle(false);
  };

  render() {
    const { link, exact, children } = this.props;

    return (
      <li className={classes["navigation-item"]}>
        <NavLink to={link} exact={exact} onClick={this.onNavLinkClickHandler}>
          {children}
        </NavLink>
      </li>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    backdropVisibilityToggle: (isOpen) =>
      dispatch({ type: "ui/backdropVisibilityToggle", payload: isOpen }),
    currencySwitcherVisibToggle: (isOpen) =>
      dispatch({ type: "ui/currencySwitcherVisibToggle", payload: isOpen }),
    miniCartVisibilityToggle: (isOpen) =>
      dispatch({ type: "ui/miniCartVisibilityToggle", payload: isOpen }),
  };
};

NavigationItem.propTypes = {
  link: PropTypes.string.isRequired,
  exact: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
  backdropVisibilityToggle: PropTypes.func.isRequired,
  currencySwitcherVisibToggle: PropTypes.func.isRequired,
  miniCartVisibilityToggle: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(NavigationItem);
