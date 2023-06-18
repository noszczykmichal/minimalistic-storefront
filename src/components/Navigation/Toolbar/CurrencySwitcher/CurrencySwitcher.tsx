/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useRef } from "react";
import { CSSTransition } from "react-transition-group";

import classes from "./CurrencySwitcher.module.css";
import { productActions } from "../../../../store/productsSlice";
import { uiActions } from "../../../../store/uiSlice";
import { useAppSelector, useAppDispatch } from "../../../../hooks/reduxHooks";
import { Currency } from "../../../../models/productSlice.models";

function CurrencySwitcher({ currencies }: { currencies: Currency[] }) {
  const switcherOptionsRef = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();
  const { isCurrencySwitcherOpen } = useAppSelector((state) => state.ui);
  const { billingCurrency } = useAppSelector((state) => state.products);
  const { onCurrencyChange } = productActions;
  const {
    backdropVisibilityToggle,
    backdropTypeToggle,
    currencySwitcherVisibToggle,
    miniCartVisibilityToggle,
  } = uiActions;

  const currencySwitcherOpen = () => {
    dispatch(currencySwitcherVisibToggle(true));
    dispatch(backdropTypeToggle(true));
    dispatch(backdropVisibilityToggle(true));
    dispatch(miniCartVisibilityToggle(false));
  };

  const currencyChangeHandler = (event: React.MouseEvent) => {
    const eventTarget = event.target as HTMLButtonElement;
    dispatch(currencySwitcherVisibToggle(false));
    dispatch(onCurrencyChange(eventTarget.getAttribute("aria-label")));
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

export default CurrencySwitcher;
