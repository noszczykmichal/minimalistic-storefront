import { Component } from "react";
import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";

import classes from "./NavigationItem.module.css";

class NavigationItem extends Component {
  render() {
    const { link, children } = this.props;

    return (
      <li className={classes["navigation-item"]}>
        <NavLink to={link}>{children}</NavLink>
      </li>
    );
  }
}

NavigationItem.propTypes = {
  link: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default NavigationItem;
