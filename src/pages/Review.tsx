import { Markup } from "interweave";
import { useNavigate } from "react-router";

import OrderSummaryList from "../components/OrderSummary/OrderSummaryList/OrderSummaryList";
import CostSummary from "../components/OrderSummary/CostSummary/CostSummary";
import Hr from "../components/UI/Hr";
import ActionButtons from "../components/Forms/ActionButtons/ActionButtons";
import { useAppSelector } from "../hooks/useReduxHooks";
import { shippingOptions, paymentOptions } from "../utils/config";
import classes from "./Review.module.css";

function Review() {
  const navigate = useNavigate();
  const {
    fName,
    lName,
    address_1: address1,
    address_2: address2,
    postal_code: postalCode,
    city,
    country,
    phone,
    email,
  } = useAppSelector((state) => state.shippingAddress.inputs);

  const { shippingOption, paymentOption } = useAppSelector(
    (state) => state.shippingPaymentOptions.inputs,
  );

  const chosenShippingMethod = shippingOptions.find(
    (element) => element.name === shippingOption.value,
  )?.label;

  const chosenPaymentMethod = paymentOptions.find(
    (element) => element.name === paymentOption.value,
  )?.label;

  const redirectToAddressPage = () => navigate("/cart/address");
  const redirectToShipAndPayPage = () => navigate("/cart/shipping&payment");

  return (
    <section className={classes.section}>
      <div className={classes.wrapper}>
        <OrderSummaryList />
        <Hr customClass={classes["hr--vertical"]} />
        <CostSummary />
      </div>
      <Hr customClass={classes["hr--horizontal"]} />
      <div className={classes["order-details"]}>
        <div className={classes["order-detail"]}>
          <h4 className={classes["order-detail__heading"]}>Shipping Address</h4>
          <p className={classes["order-detail__value"]}>
            {fName.value} {lName.value}
            <br />
            {address1.value} {address2.value}
            <br />
            {postalCode.value} {city.value}
            <br />
            {country.value}
            <br />
            tel: {phone.value}
            <br />
            email: {email.value}
          </p>
          <button
            type="button"
            className={classes["order-detail__button"]}
            onClick={redirectToAddressPage}
          >
            Change
          </button>
        </div>
        <div className={classes["order-detail"]}>
          <h4 className={classes["order-detail__heading"]}>Shipping Method</h4>
          <p className={classes["order-detail__value"]}>
            <Markup content={chosenShippingMethod} />
          </p>
          <button
            type="button"
            className={classes["order-detail__button"]}
            onClick={redirectToShipAndPayPage}
          >
            Change
          </button>
        </div>

        <div className={classes["order-detail"]}>
          <h4 className={classes["order-detail__heading"]}>Payment Method</h4>
          <p className={classes["order-detail__value"]}>
            <Markup content={chosenPaymentMethod} />
          </p>
          <button
            type="button"
            className={classes["order-detail__button"]}
            onClick={redirectToShipAndPayPage}
          >
            Change
          </button>
        </div>
      </div>
      <ActionButtons
        isNextBttnDisabled={false}
        nextBttnPath=""
        customClass={classes.actionButtons}
      />
    </section>
  );
}

export default Review;
