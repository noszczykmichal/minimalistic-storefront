import { useAppSelector } from "@/hooks/useReduxHooks";

import OrderSummaryItem from "@/components/OrderSummary/OrderSummaryList/OrderSummaryItem/OrderSummaryItem";
import classes from "@/components/OrderSummary/OrderSummaryList/OrderSummaryList.module.css";

export default function OrderSummaryList({
  headingLevel = 2,
}: {
  headingLevel?: 1 | 2;
}) {
  const { cart } = useAppSelector((state) => state.products);
  const Heading = headingLevel === 1 ? "h1" : "h2";

  return (
    <div>
      <Heading className={classes["order-summary-list__heading"]}>
        Order Summary
      </Heading>
      <ul className={classes["order-summary-list__cart-items"]}>
        {cart.map((item) => (
          <OrderSummaryItem key={item.internalID} cartItem={item} />
        ))}
      </ul>
    </div>
  );
}
