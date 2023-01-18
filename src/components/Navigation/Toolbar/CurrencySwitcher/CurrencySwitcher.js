/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { Component, createRef } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { CSSTransition } from "react-transition-group";

import classes from "./CurrencySwitcher.module.css";

class CurrencySwitcher extends Component {
  constructor(props) {
    super(props);
    this.switcherOptionsRef = createRef();
    const {
      onCurrencyChange,
      backdropVisibilityToggle,
      backdropTypeToggle,
      currencySwitcherVisibToggle,
<<<<<<< HEAD
=======
      miniCartVisibilityToggle,
>>>>>>> minimalistic-storefront__ext__endpoint/main
    } = this.props;
    this.onCurrencyChange = onCurrencyChange;
    this.backdropVisibilityToggle = backdropVisibilityToggle;
    this.backdropTypeToggle = backdropTypeToggle;
    this.currencySwitcherVisibToggle = currencySwitcherVisibToggle;
<<<<<<< HEAD
=======
    this.miniCartVisibilityToggle = miniCartVisibilityToggle;
>>>>>>> minimalistic-storefront__ext__endpoint/main
  }

  currencySwitcherOpen = () => {
    this.currencySwitcherVisibToggle(true);
    this.backdropTypeToggle();
    this.backdropVisibilityToggle(true);
<<<<<<< HEAD
=======
    this.miniCartVisibilityToggle(false);
>>>>>>> minimalistic-storefront__ext__endpoint/main
  };

  currencyChangeHandler = (event) => {
    this.currencySwitcherVisibToggle(false);
<<<<<<< HEAD
    this.onCurrencyChange(event.target.ariaLabel);
=======
    this.onCurrencyChange(event.target.getAttribute("aria-label"));
>>>>>>> minimalistic-storefront__ext__endpoint/main
    this.backdropVisibilityToggle(false);
  };

  render() {
    const { isCurrencySwitcherOpen, currencies, billingCurrency } = this.props;
    let classesArrow = classes.button__arrow;

    if (isCurrencySwitcherOpen) {
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

        <CSSTransition
          in={isCurrencySwitcherOpen}
          timeout={300}
          classNames={{
            enter: "",
            enterActive: classes["switcher__options--open"],
            exit: "",
            exitActive: classes["switcher__options--closed"],
          }}
          nodeRef={this.switcherOptionsRef}
          mountOnEnter
          unmountOnExit
        >
          <div
            className={classes.switcher__options}
            ref={this.switcherOptionsRef}
          >
            {currencies.map((currency) => (
              <div
                key={currency.label}
                aria-label={currency.symbol}
                className={classes.switcher__option}
                onClick={this.currencyChangeHandler}
              >
                <span className={classes.option__symbol}>
                  {currency.symbol}
                </span>
                <span className={classes.option__label}>{currency.label}</span>
              </div>
            ))}
          </div>
        </CSSTransition>
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
<<<<<<< HEAD
=======
    miniCartVisibilityToggle: (isOpen) =>
      dispatch({ type: "ui/miniCartVisibilityToggle", payload: isOpen }),
>>>>>>> minimalistic-storefront__ext__endpoint/main
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
<<<<<<< HEAD
=======
  miniCartVisibilityToggle: PropTypes.func.isRequired,
>>>>>>> minimalistic-storefront__ext__endpoint/main
};

export default connect(mapStateToProps, mapDispatchToProps)(CurrencySwitcher);
