import { useEffect, useId, useRef } from "react";
import { createPortal } from "react-dom";
import { CSSTransition } from "react-transition-group";

import MiniCartItems from "@/components/Cart/MiniCart/MiniCartItems/MiniCartItems";
import { useAppSelector } from "@/hooks/useReduxHooks";
import useRedirect from "@/hooks/useRedirect";
import ActionButtons from "@/components/Forms/ActionButtons/ActionButtons";
import classes from "@/components/Cart/MiniCart/MiniCart.module.css";

export default function MiniCart() {
  const miniCartRef = useRef<HTMLDivElement>(null);
  const redirect = useRedirect();
  const productsTotal = useAppSelector((state) => state.products.productsTotal);
  const totalPrice = useAppSelector((state) => state.products.totalPrice);
  const billingCurrency = useAppSelector(
    (state) => state.products.billingCurrency,
  );
  const isMiniCartOpen = useAppSelector((state) => state.ui.isMiniCartOpen);
  const headingId = useId();

  useEffect(() => {
    if (isMiniCartOpen) {
      miniCartRef.current?.focus();
    }
  }, [isMiniCartOpen]);

  useEffect(() => {
    if (!isMiniCartOpen) {
      return undefined;
    }

    const onKeyDownHandler = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        redirect();
      }
    };

    document.addEventListener("keydown", onKeyDownHandler);

    return () => document.removeEventListener("keydown", onKeyDownHandler);
  }, [isMiniCartOpen, redirect]);

  const onProceedToCartHandler = () => redirect("/cart");
  const onProceedToCheckOutHandler = () =>
    redirect("/cart/shipping/address&payment");

  return createPortal(
    <CSSTransition
      in={isMiniCartOpen}
      timeout={300}
      classNames={{
        enter: "",
        enterActive: classes["mini-cart--open"],
        exit: "",
        exitActive: classes["mini-cart--closed"],
      }}
      nodeRef={miniCartRef}
      mountOnEnter
      unmountOnExit
    >
      <div
        id="mini-cart"
        role="dialog"
        aria-labelledby={headingId}
        tabIndex={-1}
        className={classes["mini-cart"]}
        ref={miniCartRef}
      >
        <h2 id={headingId} className={classes["mini-cart__title"]}>
          My Bag,{" "}
          <span className={classes["title__items-count"]}>{productsTotal}</span>{" "}
          <span className={classes["title__items-count"]}>
            {productsTotal === 1 ? "item" : "items"}
          </span>
        </h2>
        <MiniCartItems />
        <dl className={classes["mini-cart__total-price"]}>
          <dt className={classes["total-price__text"]}>Total</dt>
          <dd className={classes["total-price__price"]}>
            {billingCurrency}
            {totalPrice.toFixed(2)}
          </dd>
        </dl>
        <ActionButtons
          backButtonHandler={onProceedToCartHandler}
          backBttnCustomText="View Bag"
          nextButtonHandler={onProceedToCheckOutHandler}
          nextBttnCustomText="Check out"
        />
      </div>
    </CSSTransition>,
    document.getElementById("modals-root") as HTMLDivElement,
  );
}
