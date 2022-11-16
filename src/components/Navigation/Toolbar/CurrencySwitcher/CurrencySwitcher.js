/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import classes from "./CurrencySwitcher.module.css";

class CurrencySwitcher extends Component {
  constructor(props) {
    super(props);
    const {
      onCurrencyChange,
      backdropVisibilityToggle,
      backdropTypeToggle,
      currencySwitcherVisibToggle,
    } = this.props;
    this.onCurrencyChange = onCurrencyChange;
    this.backdropVisibilityToggle = backdropVisibilityToggle;
    this.backdropTypeToggle = backdropTypeToggle;
    this.currencySwitcherVisibToggle = currencySwitcherVisibToggle;
  }

  currencySwitcherOpen = () => {
    this.currencySwitcherVisibToggle(true);
    this.backdropTypeToggle();
    this.backdropVisibilityToggle(true);
  };

  currencyChangeHandler = (event) => {
    this.currencySwitcherVisibToggle(false);
    this.onCurrencyChange(event.target.ariaLabel);
    this.backdropVisibilityToggle(false);
  };

  render() {
    const { isCurrencySwitcherOpen, currencies, billingCurrency } = this.props;
    let classesOptions = [classes.switcher__options];
    let classesArrow = classes.button__arrow;

    if (isCurrencySwitcherOpen) {
      classesOptions = [
        classes.switcher__options,
        classes["switcher__options--open"],
      ];

      classesArrow = classes["button__arrow--rotate"];
    }

    return (
      <div className={classes.switcher}>
        <button
          type="button"
          className={classes.switcher__button}
          onClick={this.currencySwitcherOpen}
        >
          <span className={classes.button__content}>{billingCurrency}</span>
          <svg
            width="8"
            height="4"
            viewBox="0 0 8 4"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={classesArrow}
          >
            <path
              d="M1 3.5L4 0.5L7 3.5"
              stroke="black"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        <div className={classesOptions.join(" ")}>
          {currencies.map((currency) => (
            <div
              key={currency.label}
              aria-label={currency.symbol}
              className={classes.switcher__option}
              onClick={this.currencyChangeHandler}
            >
              <span className={classes.option__symbol}>{currency.symbol}</span>
              <span className={classes.option__label}>{currency.label}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isCurrencySwitcherOpen: state.ui.isCurrencySwitcherOpen,
    billingCurrency: state.products.billingCurrency,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onCurrencyChange: (currency) =>
      dispatch({ type: "products/onCurrencyChange", payload: currency }),
    backdropVisibilityToggle: (isOpen) =>
      dispatch({ type: "ui/backdropVisibilityToggle", payload: isOpen }),
    backdropTypeToggle: () =>
      dispatch({ type: "ui/backdropTypeToggle", payload: true }),
    currencySwitcherVisibToggle: (isOpen) =>
      dispatch({ type: "ui/currencySwitcherVisibToggle", payload: isOpen }),
  };
};

CurrencySwitcher.propTypes = {
  isCurrencySwitcherOpen: PropTypes.bool.isRequired,
  onCurrencyChange: PropTypes.func.isRequired,
  backdropVisibilityToggle: PropTypes.func.isRequired,
  backdropTypeToggle: PropTypes.func.isRequired,
  currencySwitcherVisibToggle: PropTypes.func.isRequired,
  billingCurrency: PropTypes.string.isRequired,
  currencies: PropTypes.arrayOf(
    PropTypes.shape({
      __typename: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      symbol: PropTypes.string.isRequired,
    }),
  ).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(CurrencySwitcher);
