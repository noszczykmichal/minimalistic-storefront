import MiniCartItem from "@/components/Cart/MiniCart/MiniCartItems/MiniCartItem/MiniCartItem";
import { useAppSelector } from "@/hooks/useReduxHooks";
import classes from "@/components/Cart/MiniCart/MiniCartItems/MiniCartItems.module.css";

export default function MiniCartItems() {
  const { cart } = useAppSelector((state) => state.products);

  return (
    <ul className={classes["cart-items"]}>
      {cart.map((cartItem) => (
        <MiniCartItem key={cartItem.internalID} itemDetails={cartItem} />
      ))}
    </ul>
  );
}
