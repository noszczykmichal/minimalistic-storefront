import { Component } from "react";
import { connect } from "react-redux";
import { createPortal } from "react-dom";
import PropTypes from "prop-types";

import NavigationItems from "../NavigationItems/NavigationItems";
import classes from "./Toolbar.module.css";
import Logo from "./Logo/Logo";
import CartIcon from "./CartIcon/CartIcon";
import CurrencySwitcher from "./CurrencySwitcher/CurrencySwitcher";
import Backdrop from "../../UI/Backdrop";
import MiniCart from "../../Cart/MiniCart/Minicart";

class Toolbar extends Component {
  render() {
    const { categories, currencies, isMiniCartOpen } = this.props;
    let navigationItems;
    let currencySwitcher;
    let minicart;
    if (categories) {
      navigationItems = <NavigationItems categories={categories} />;
    }
    if (currencies) {
      currencySwitcher = <CurrencySwitcher currencies={currencies} />;
    }

    if (isMiniCartOpen) {
      minicart = <MiniCart />;
    }

    return (
      <header className={classes.toolbar}>
        <nav className={classes.toolbar__nav}>{navigationItems}</nav>
        <Logo />
        <div className={classes["cart-actions"]}>
          {currencySwitcher}
          <CartIcon />
          {minicart}
        </div>

        {createPortal(
          <Backdrop clicked={this.onBackdropClick} />,
          document.getElementById("backdrop-root"),
        )}
      </header>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    categories: state.ui.categories,
    currencies: state.ui.currencies,
    isMiniCartOpen: state.ui.isMiniCartOpen,
  };
};

Toolbar.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.string).isRequired,
  currencies: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      symbol: PropTypes.string.isRequired,
    }),
  ).isRequired,
  isMiniCartOpen: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps)(Toolbar);
