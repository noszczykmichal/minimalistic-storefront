import classes from "./ShippingAndPayment.module.css";
import OrderSummary from "../components/OrderSummary/OrderSummary";
import Button from "../components/UI/Button";

function ShippingAndPayment() {
  return (
    <section className={classes.section}>
      <div className={classes["shipping-form__wrapper"]}>
        <h1>Shipping</h1>
        <p>Choose a shipping method</p>
        <form className={classes.form}>
          <label htmlFor="name">
            <input type="radio" value="dsdsd" />
            dsdsds
          </label>
          <Button customClass={classes.form__button}>PROCEED TO BILLING</Button>
        </form>
      </div>

      <OrderSummary />
    </section>
  );
}

export default ShippingAndPayment;
