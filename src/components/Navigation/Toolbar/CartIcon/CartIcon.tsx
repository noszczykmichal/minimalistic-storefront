import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

import Backdrop from "@/components/UI/Backdrop/Backdrop";
import { uiActions } from "@/store/ui/ui";
import { useAppSelector, useAppDispatch } from "@/hooks/useReduxHooks";
import classes from "@/components/Navigation/Toolbar/CartIcon/CartIcon.module.css";
import ShoppingCartIcon from "@/components/UI/Icons/ShoppingCartIcon/ShoppingCartIcon";

export default function CartIcon() {
  const dispatch = useAppDispatch();
  const { productsTotal } = useAppSelector((state) => state.products);
  const { isMiniCartOpen } = useAppSelector((state) => state.ui);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const wasMiniCartOpen = useRef(isMiniCartOpen);
  const { miniCartVisibilityToggle, currencySwitcherVisibToggle } = uiActions;

  const minicartToggle = () => {
    dispatch(miniCartVisibilityToggle(true));
    dispatch(currencySwitcherVisibToggle(false));
  };

  const onClose = () => {
    dispatch(miniCartVisibilityToggle(false));
  };

  useEffect(() => {
    if (wasMiniCartOpen.current && !isMiniCartOpen) {
      buttonRef.current?.focus();
    }
    wasMiniCartOpen.current = isMiniCartOpen;
  }, [isMiniCartOpen]);

  const itemsCount = productsTotal || 0;
  const itemsLabel = itemsCount === 1 ? "item" : "items";

  return (
    <>
      <button
        type="button"
        className={classes["cart-button"]}
        onClick={minicartToggle}
        ref={buttonRef}
        aria-label={`Cart: ${itemsCount} ${itemsLabel}`}
        aria-expanded={!!isMiniCartOpen}
        aria-controls="mini-cart"
        disabled={!itemsCount}
      >
        <ShoppingCartIcon size={20} />
        {itemsCount ? (
          <span className={classes.counter}>{itemsCount}</span>
        ) : null}
      </button>
      {createPortal(
        <Backdrop isBackdropOpen={isMiniCartOpen} onClose={onClose} />,
        document.getElementById("modals-root") as HTMLDivElement,
      )}
    </>
  );
}
