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
              key={category.name}
              link={category.name === "all" ? "/" : `/${category.name}`}
              end={category.name === "all"}
            >
              {category.name}
            </NavigationItem>
          );
        })}
      </ul>
    );
  }
}

NavigationItems.propTypes = {
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      __typename: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    }),
  ).isRequired,
};

export default NavigationItems;
