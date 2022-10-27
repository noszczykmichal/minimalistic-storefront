/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { Component } from "react";
import PropTypes from "prop-types";

import classes from "./CurrencySwitcher.module.css";
import Backdrop from "../../../UI/Backdrop";

class CurrencySwitcher extends Component {
  constructor(props) {
    super(props);

    this.state = {
      switcherIsOpen: false,
      currency: "$",
    };
  }

  currencySwitcherToggler = () => {
    this.setState((prevState) => ({
      switcherIsOpen: !prevState.switcherIsOpen,
    }));
  };

  onCurrencyChange = (event) => {
    this.setState({ currency: event.target.ariaLabel });
  };

  render() {
    const { switcherIsOpen, currency } = this.state;
    const { currencies } = this.props;
    let classesOptions = [classes.switcher__options];
    let classesArrow = classes.button__arrow;

    if (switcherIsOpen) {
      classesOptions = [
        classes.switcher__options,
        classes["switcher__options--open"],
      ];

      classesArrow = classes["button__arrow--rotate"];
    }

    return (
      <>
        <Backdrop
          show={switcherIsOpen}
          variant="transparent"
          clicked={this.currencySwitcherToggler}
        />
        <div className={classes.switcher}>
          <button
            type="button"
            className={classes.switcher__button}
            onClick={this.currencySwitcherToggler}
          >
            <span className={classes.button__content}>{currency}</span>
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
                onClick={this.onCurrencyChange}
              >
                <span className={classes.option__symbol}>
                  {currency.symbol}
                </span>
                <span className={classes.option__label}>{currency.label}</span>
              </div>
            ))}
          </div>
        </div>
      </>
    );
  }
}

CurrencySwitcher.propTypes = {
  currencies: PropTypes.arrayOf(
    PropTypes.shape({
      __typename: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      symbol: PropTypes.string.isRequired,
    }),
  ).isRequired,
};

export default CurrencySwitcher;
