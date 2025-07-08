import OrderSummaryList from "@/components/OrderSummary/OrderSummaryList/OrderSummaryList";
import Hr from "@/components/UI/Hr/Hr";
import CostSummary from "@/components/OrderSummary/CostSummary/CostSummary";
import classes from "@/components/OrderSummary/OrderSummary.module.css";

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
