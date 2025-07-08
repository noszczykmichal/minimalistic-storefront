import { useAppSelector } from "@/hooks/useReduxHooks";

import OrderSummaryItem from "@/components/OrderSummary/OrderSummaryList/OrderSummaryItem/OrderSummaryItem";
import classes from "@/components/OrderSummary/OrderSummaryList/OrderSummaryList.module.css";

function OrderSummaryList() {
  const { cart } = useAppSelector((state) => state.products);
  return (
    <div>
      <p className={classes["order-summary-list__heading"]}>Order Summary</p>
      <ul className={classes["order-summary-list__cart-items"]}>
        {cart.map((item) => (
          <OrderSummaryItem key={item.internalID} cartItem={item} />
        ))}
      </ul>
    </div>
  );
}

export default OrderSummaryList;
