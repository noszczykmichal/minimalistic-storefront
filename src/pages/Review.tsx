import classes from "./Review.module.css";
import OrderSummaryList from "../components/OrderSummary/OrderSummaryList/OrderSummaryList";
import CostSummary from "../components/OrderSummary/CostSummary/CostSummary";
import Hr from "../components/UI/Hr";
import ActionButtons from "../components/Forms/ActionButtons/ActionButtons";

function Review() {
  return (
    <section className={classes.section}>
      <div className={classes.wrapper}>
        <OrderSummaryList />
        <Hr customClass={classes.hr} />
        <CostSummary />
      </div>
      <Hr customClass={classes.gr} />
      <ActionButtons isNextBttnDisabled={false} nextBttnPath="" />
    </section>
  );
}

export default Review;
