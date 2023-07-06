import CartPageItem from "../components/Cart/CartPageItem/CartPageItem";
import classes from "./Cart.module.css";
import Hr from "../components/UI/Hr";
import Button from "../components/UI/Button";
import { useAppSelector } from "../hooks/useReduxHooks";
import { CartItem } from "../models/productSlice.models";
import useRedirect from "../hooks/useRedirect";

function Cart() {
  const { billingCurrency, cart, productsTotal, totalPrice } = useAppSelector(
    (state) => state.products,
  );
  const redirect = useRedirect();

  const onOrderHandler = () => redirect("/address");

  return (
    <section>
      <h1 className={classes.title}>Cart</h1>
      <ul className={classes["items-list"]}>
        {cart.map((cartItem: CartItem) => (
          <CartPageItem key={cartItem.internalID} itemDetails={cartItem} />
        ))}
      </ul>
      <Hr customClass={classes.cart__hr} />
      <div className={classes.summary}>
        <div className={classes["summary-wrapper__labels"]}>
          <p className={classes["summary-wrapper__label"]}>Tax 21%: </p>
          <p className={classes["summary-wrapper__label"]}>Quantity: </p>
          <p
            className={[
              classes["summary-wrapper__label"],
              classes["summary-wrapper__label--bold"],
            ].join(" ")}
          >
            Total:
          </p>
        </div>
        <div className={classes["summary-wrapper__values"]}>
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
      <Button customClass={classes.summary__button} clicked={onOrderHandler}>
        Order
      </Button>
    </section>
  );
}

export default Cart;
