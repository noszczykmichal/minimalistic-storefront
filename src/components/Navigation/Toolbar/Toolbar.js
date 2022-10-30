import { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import NavigationItems from "../NavigationItems/NavigationItems";
import classes from "./Toolbar.module.css";
import Logo from "./Logo/Logo";
import CartIcon from "./CartIcon/CartIcon";
import CurrencySwitcher from "./CurrencySwitcher/CurrencySwitcher";

class Toolbar extends Component {
  render() {
    const { categories, currencies } = this.props;
    let navigationItems;
    let currencySwitcher;
    if (categories) {
      navigationItems = <NavigationItems categories={categories} />;
    }
    if (currencies) {
      currencySwitcher = <CurrencySwitcher currencies={currencies} />;
    }

    return (
      <header className={classes.toolbar}>
        <nav className={classes.toolbar__nav}>{navigationItems}</nav>
        <Logo />
        <div className={classes["cart-actions"]}>
          {currencySwitcher}
          <CartIcon />
        </div>
      </header>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    categories: state.ui.categories,
    currencies: state.ui.currencies,
  };
};

Toolbar.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.string).isRequired,
  currencies: PropTypes.arrayOf(
    PropTypes.shape({
      __typename: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      symbol: PropTypes.string.isRequired,
    }),
  ).isRequired,
};

export default connect(mapStateToProps)(Toolbar);
