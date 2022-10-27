import { Component } from "react";
import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";

import classes from "./NavigationItem.module.css";

class NavigationItem extends Component {
  render() {
    const { link, end, children } = this.props;

    return (
      <li className={classes["navigation-item"]}>
        <NavLink to={link} end={end}>
          {children}
        </NavLink>
      </li>
    );
  }
}

NavigationItem.propTypes = {
  link: PropTypes.string.isRequired,
  end: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
};

export default NavigationItem;
