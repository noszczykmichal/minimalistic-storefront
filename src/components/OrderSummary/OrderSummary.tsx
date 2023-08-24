import classes from "./OrderSummary.module.css";

import OrderSummaryList from "./OrderSummaryList/OrderSummaryList";
import Hr from "../UI/Hr/Hr";
import CostSummary from "./CostSummary/CostSummary";

function OrderSummary() {
  return (
    <div className={classes["order-summary"]}>
      <OrderSummaryList />
      <Hr customClass={classes["order-summary__hr"]} />
      <CostSummary />
    </div>
  );
}

export default OrderSummary;
