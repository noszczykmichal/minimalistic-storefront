import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";

import classes from "./NavigationItem.module.css";
import { uiActions } from "../../../../store/uiSlice";

function NavigationItem({ link, exact, children }) {
  const dispatch = useDispatch();
  const {
    backdropVisibilityToggle,
    currencySwitcherVisibToggle,
    miniCartVisibilityToggle,
    mobileNavVisibilityToggle,
  } = uiActions;

  const onNavLinkClickHandler = () => {
    dispatch(backdropVisibilityToggle(false));
    dispatch(currencySwitcherVisibToggle(false));
    dispatch(miniCartVisibilityToggle(false));
    dispatch(mobileNavVisibilityToggle(false));
  };

  return (
    <li className={classes["navigation-item"]}>
      <NavLink to={link} exact={`${exact}`} onClick={onNavLinkClickHandler}>
        {children}
      </NavLink>
    </li>
  );
}

NavigationItem.propTypes = {
  link: PropTypes.string.isRequired,
  exact: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
};

export default NavigationItem;
