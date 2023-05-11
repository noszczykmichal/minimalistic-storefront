/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useRef } from "react";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import { CSSTransition } from "react-transition-group";

import classes from "./CurrencySwitcher.module.css";
import { productActions } from "../../../../store/productsSlice";
import { uiActions } from "../../../../store/uiSlice";

function CurrencySwitcher({ currencies }) {
  const switcherOptionsRef = useRef();
  const dispatch = useDispatch();
  const isCurrencySwitcherOpen = useSelector(
    (state) => state.ui.isCurrencySwitcherOpen,
  );
  const billingCurrency = useSelector(
    (state) => state.products.billingCurrency,
  );
  const { onCurrencyChange } = productActions;
  const {
    backdropVisibilityToggle,
    backdropTypeToggle,
    currencySwitcherVisibToggle,
    miniCartVisibilityToggle,
  } = uiActions;

  const currencySwitcherOpen = () => {
    dispatch(currencySwitcherVisibToggle(true));
    dispatch(backdropTypeToggle());
    dispatch(backdropVisibilityToggle(true));
    dispatch(miniCartVisibilityToggle(false));
  };

  const currencyChangeHandler = (event) => {
    dispatch(currencySwitcherVisibToggle(false));
    dispatch(onCurrencyChange(event.target.getAttribute("aria-label")));
    dispatch(backdropVisibilityToggle(false));
  };

  let classesArrow = classes.button__arrow;

  if (isCurrencySwitcherOpen) {
    classesArrow = classes["button__arrow--rotate"];
  }

  return (
    <div className={classes.switcher}>
      <button
        type="button"
        className={classes.switcher__button}
        onClick={currencySwitcherOpen}
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
        nodeRef={switcherOptionsRef}
        mountOnEnter
        unmountOnExit
      >
        <div className={classes.switcher__options} ref={switcherOptionsRef}>
          {currencies.map((currency) => (
            <div
              key={currency.label}
              aria-label={currency.symbol}
              className={classes.switcher__option}
              onClick={currencyChangeHandler}
            >
              <span className={classes.option__symbol}>{currency.symbol}</span>
              <span className={classes.option__label}>{currency.label}</span>
            </div>
          ))}
        </div>
      </CSSTransition>
    </div>
  );
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
