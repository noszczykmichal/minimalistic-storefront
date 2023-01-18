import { Component } from "react";
import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";
<<<<<<< HEAD
=======
import { connect } from "react-redux";
>>>>>>> minimalistic-storefront__ext__endpoint/main

import classes from "./NavigationItem.module.css";

class NavigationItem extends Component {
<<<<<<< HEAD
=======
  onNavLinkClickHandler = () => {
    const {
      backdropVisibilityToggle,
      currencySwitcherVisibToggle,
      miniCartVisibilityToggle,
      mobileNavVisibilityToggle,
    } = this.props;
    backdropVisibilityToggle(false);
    currencySwitcherVisibToggle(false);
    miniCartVisibilityToggle(false);
    mobileNavVisibilityToggle(false);
  };

>>>>>>> minimalistic-storefront__ext__endpoint/main
  render() {
    const { link, exact, children } = this.props;

    return (
      <li className={classes["navigation-item"]}>
<<<<<<< HEAD
        <NavLink to={link} exact={exact}>
=======
        <NavLink to={link} exact={exact} onClick={this.onNavLinkClickHandler}>
>>>>>>> minimalistic-storefront__ext__endpoint/main
          {children}
        </NavLink>
      </li>
    );
  }
}

<<<<<<< HEAD
=======
const mapDispatchToProps = (dispatch) => {
  return {
    backdropVisibilityToggle: (isOpen) =>
      dispatch({ type: "ui/backdropVisibilityToggle", payload: isOpen }),
    currencySwitcherVisibToggle: (isOpen) =>
      dispatch({ type: "ui/currencySwitcherVisibToggle", payload: isOpen }),
    miniCartVisibilityToggle: (isOpen) =>
      dispatch({ type: "ui/miniCartVisibilityToggle", payload: isOpen }),
    mobileNavVisibilityToggle: (isOpen) =>
      dispatch({ type: "ui/mobileNavVisibilityToggle", payload: isOpen }),
  };
};

>>>>>>> minimalistic-storefront__ext__endpoint/main
NavigationItem.propTypes = {
  link: PropTypes.string.isRequired,
  exact: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
<<<<<<< HEAD
};

export default NavigationItem;
=======
  backdropVisibilityToggle: PropTypes.func.isRequired,
  currencySwitcherVisibToggle: PropTypes.func.isRequired,
  miniCartVisibilityToggle: PropTypes.func.isRequired,
  mobileNavVisibilityToggle: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(NavigationItem);
>>>>>>> minimalistic-storefront__ext__endpoint/main
