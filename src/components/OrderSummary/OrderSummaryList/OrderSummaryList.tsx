import { useAppSelector } from "../../../hooks/useReduxHooks";

import classes from "./OrderSummaryList.module.css";
import OrderSummaryItem from "./OrderSummaryItem/OrderSummaryItem";

function OrderSummaryList() {
  const { cart } = useAppSelector((state) => state.products);
  return (
    <>
      <p className={classes["order-summary-list__heading"]}>Order Summary</p>
      <ul className={classes["order-summary-list__cart-items"]}>
        {cart.map((item) => (
          <OrderSummaryItem key={item.internalID} cartItem={item} />
        ))}
      </ul>
    </>
  );
}

export default OrderSummaryList;
