import MiniCartItem from "./MiniCartItem/MiniCartItem";
import classes from "./MiniCartItems.module.css";
import { useAppSelector } from "../../../../hooks/reduxHooks";

function MiniCartItems() {
  const { cart } = useAppSelector((state) => state.products);

  return (
    <ul className={classes["cart-items"]}>
      {cart.map((cartItem) => (
        <MiniCartItem key={cartItem.internalID} itemDetails={cartItem} />
      ))}
    </ul>
  );
}

export default MiniCartItems;
