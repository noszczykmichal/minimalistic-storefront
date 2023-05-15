import { useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { CSSTransition } from "react-transition-group";

import classes from "./MiniCart.module.css";
import MiniCartItems from "./MiniCartItems/MiniCartItems";
import Button from "../../UI/Button";
import { uiActions } from "../../../store/uiSlice";

function MiniCart() {
  const miniCartRef = useRef();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { productsTotal, totalPrice, billingCurrency } = useSelector(
    (state) => state.products,
  );
  const isMiniCartOpen = useSelector((state) => state.ui.isMiniCartOpen);
  const { backdropVisibilityToggle, miniCartVisibilityToggle } = uiActions;

  const clickHandler = () => {
    dispatch(backdropVisibilityToggle(false));
    dispatch(miniCartVisibilityToggle(false));
    navigate("/cart");
  };

  return (
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
      <div className={classes["mini-cart"]} ref={miniCartRef}>
        <h2 className={classes["mini-cart__title"]}>
          My Bag,{" "}
          <span className={classes["title__items-count"]}>{productsTotal}</span>{" "}
          <span className={classes["title__items-count"]}>
            {productsTotal === 1 ? "item" : "items"}
          </span>
        </h2>
        <MiniCartItems />
        <div className={classes["mini-cart__total-price"]}>
          <p className={classes["total-price__text"]}>Total</p>
          <p className={classes["total-price__price"]}>
            {billingCurrency}
            {totalPrice.toFixed(2)}
          </p>
        </div>
        <div className={classes["mini-cart__actions"]}>
          <Button
            customClass={[
              classes.actions__button,
              classes["actions__button--transparent"],
            ].join(" ")}
            clicked={clickHandler}
          >
            View Bag
          </Button>
          <Button
            customClass={[
              classes.actions__button,
              classes["actions__button--green"],
            ].join(" ")}
          >
            Check out
          </Button>
        </div>
      </div>
    </CSSTransition>
  );
}

export default MiniCart;
