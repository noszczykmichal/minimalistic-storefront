import { Component } from "react";
import PropTypes from "prop-types";

import classes from "./CurrencySwitcher.module.css";

class CurrencySwitcher extends Component {
  render() {
    const { currencies } = this.props;
    return (
      <div className={classes.switcher}>
        <div className={classes.switcher__actions}>
          <p className={classes.switcher__action}>$</p>
          <svg
            width="8"
            height="4"
            viewBox="0 0 8 4"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1 3.5L4 0.5L7 3.5"
              stroke="black"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        <div className={classes.switcher__options}>
          {currencies.map((currency) => (
            <div key={currency.label} className={classes.switcher__option}>
              <span className={classes.option__symbol}>{currency.symbol}</span>
              <span>{currency.label}</span>
            </div>
          ))}
        </div>
      </div>
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
