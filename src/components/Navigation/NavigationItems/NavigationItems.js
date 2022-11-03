import { Component } from "react";
import PropTypes from "prop-types";

import NavigationItem from "./NavigationItem/NavigationItem";
import classes from "./NavigationItems.module.css";

class NavigationItems extends Component {
  render() {
    const { categories } = this.props;

    return (
      <ul className={classes["navigation-items"]}>
        {categories.map((category) => {
          return (
            <NavigationItem
              key={category}
              link={category === "all" ? "/" : `/${category}`}
              exact={category === "all"}
            >
              {category}
            </NavigationItem>
          );
        })}
      </ul>
    );
  }
}

NavigationItems.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default NavigationItems;
