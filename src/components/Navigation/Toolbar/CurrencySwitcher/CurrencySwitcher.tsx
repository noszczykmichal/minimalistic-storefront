import { useEffect, useId, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { CSSTransition } from "react-transition-group";

import { productActions } from "@/store/products";
import { uiActions } from "@/store/uiSlice";
import { useAppSelector, useAppDispatch } from "@/hooks/useReduxHooks";
import { Currency } from "@/types/types";
import classes from "@/components/Navigation/Toolbar/CurrencySwitcher/CurrencySwitcher.module.css";

export default function CurrencySwitcher({
  currencies,
}: {
  currencies: Currency[];
}) {
  const switcherOptionsRef = useRef<HTMLDivElement>(null);
  const switcherButtonRef = useRef<HTMLButtonElement>(null);
  const selectedOptionRef = useRef<HTMLButtonElement>(null);
  const [optionsLeft, setOptionsLeft] = useState<number>();
  const optionsId = useId();
  const dispatch = useAppDispatch();
  const { isCurrencySwitcherOpen } = useAppSelector((state) => state.ui);
  const { billingCurrency } = useAppSelector((state) => state.products);
  const wasCurrencySwitcherOpen = useRef(isCurrencySwitcherOpen);
  const { onCurrencyChange } = productActions;
  const {
    backdropVisibilityToggle,
    backdropTypeToggle,
    currencySwitcherVisibToggle,
    miniCartVisibilityToggle,
  } = uiActions;

  // The options list is portaled out of the toolbar, so it is aligned with
  // the switcher button explicitly.
  useLayoutEffect(() => {
    if (!isCurrencySwitcherOpen) {
      return undefined;
    }

    const updateOptionsPosition = () =>
      setOptionsLeft(switcherButtonRef.current?.getBoundingClientRect().left);

    updateOptionsPosition();
    window.addEventListener("resize", updateOptionsPosition);
    return () => window.removeEventListener("resize", updateOptionsPosition);
  }, [isCurrencySwitcherOpen]);

  // Move focus into the dialog when it opens and back to the switcher button
  // when it closes (option chosen, Escape or backdrop click).
  useEffect(() => {
    if (isCurrencySwitcherOpen) {
      (selectedOptionRef.current ?? switcherOptionsRef.current)?.focus();
    } else if (wasCurrencySwitcherOpen.current) {
      switcherButtonRef.current?.focus();
    }
    wasCurrencySwitcherOpen.current = isCurrencySwitcherOpen;
  }, [isCurrencySwitcherOpen]);

  useEffect(() => {
    if (!isCurrencySwitcherOpen) {
      return undefined;
    }

    const onKeyDownHandler = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        dispatch(currencySwitcherVisibToggle(false));
        dispatch(backdropVisibilityToggle(false));
      }
    };

    document.addEventListener("keydown", onKeyDownHandler);
    return () => document.removeEventListener("keydown", onKeyDownHandler);
  }, [
    isCurrencySwitcherOpen,
    dispatch,
    currencySwitcherVisibToggle,
    backdropVisibilityToggle,
  ]);

  const currencySwitcherOpen = () => {
    dispatch(currencySwitcherVisibToggle(true));
    dispatch(backdropTypeToggle(true));
    dispatch(backdropVisibilityToggle(true));
    dispatch(miniCartVisibilityToggle(false));
  };

  const currencyChangeHandler = (symbol: string) => {
    dispatch(currencySwitcherVisibToggle(false));
    dispatch(onCurrencyChange(symbol));
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
        aria-label="Currencies Pane"
        aria-haspopup="dialog"
        aria-expanded={!!isCurrencySwitcherOpen}
        aria-controls={optionsId}
        ref={switcherButtonRef}
      >
        {billingCurrency}
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

      {createPortal(
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
          <div
            id={optionsId}
            role="dialog"
            aria-label="Currencies"
            tabIndex={-1}
            className={classes.switcher__options}
            style={{ left: optionsLeft }}
            ref={switcherOptionsRef}
          >
            <ul className={classes.options__list}>
              {currencies.map((currency) => {
                const isSelected = currency.symbol === billingCurrency;

                return (
                  <li key={currency.label}>
                    <button
                      type="button"
                      aria-label={`${currency.symbol} ${currency.label}`}
                      aria-pressed={isSelected}
                      className={classes.switcher__option}
                      onClick={() => currencyChangeHandler(currency.symbol)}
                      ref={isSelected ? selectedOptionRef : undefined}
                    >
                      <span className={classes.option__symbol}>
                        {currency.symbol}
                      </span>
                      <span className={classes.option__label}>
                        {currency.label}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        </CSSTransition>,
        document.getElementById("modals-root") as HTMLDivElement,
      )}
    </div>
  );
}
