import { useSelector } from "react-redux";

import CartPageItem from "../components/Cart/CartPageItem/CartPageItem";
import classes from "./Cart.module.css";
import Hr from "../components/UI/Hr";
import Button from "../components/UI/Button";
import { CartItem } from "../models/productSlice.models";

function Cart() {
  const { billingCurrency, cart, productsTotal, totalPrice } = useSelector(
    (state) => state.products,
  );

  return (
    <section>
      <h1 className={classes.title}>Cart</h1>
      <ul className={classes["items-list"]}>
        {cart.map((cartItem: CartItem) => (
          <CartPageItem key={cartItem.internalID} itemDetails={cartItem} />
        ))}
      </ul>
      <Hr />
      <div className={classes.summery}>
        <div className={classes["summery-wrapper__labels"]}>
          <p className={classes["summery-wrapper__label"]}>Tax 21%: </p>
          <p className={classes["summery-wrapper__label"]}>Quantity: </p>
          <p
            className={[
              classes["summery-wrapper__label"],
              classes["summery-wrapper__label--bold"],
            ].join(" ")}
          >
            Total:
          </p>
        </div>
        <div className={classes["summery-wrapper__values"]}>
          <p className={classes.values__item}>
            {billingCurrency}
            {(totalPrice * 0.21).toFixed(2)}
          </p>
          <p className={classes.values__item}>{productsTotal}</p>
          <p className={classes.values__item}>
            {billingCurrency}
            {totalPrice.toFixed(2)}
          </p>
        </div>
      </div>
      <Button customClass={classes.summery__button}>Order</Button>
    </section>
  );
}

export default Cart;
