import { useSelector } from "react-redux";

import MiniCartItem from "./MiniCartItem/MiniCartItem";
import classes from "./MiniCartItems.module.css";

function MiniCartItems() {
  const { cart } = useSelector((state) => state.products);

  return (
    <ul className={classes["cart-items"]}>
      {cart.map((cartItem) => (
        <MiniCartItem key={cartItem.internalID} itemDetails={cartItem} />
      ))}
    </ul>
  );
}

export default MiniCartItems;
