import { Markup } from "interweave";
import { useNavigate } from "react-router";

import OrderSummaryList from "@/components/OrderSummary/OrderSummaryList/OrderSummaryList";
import CostSummary from "@/components/OrderSummary/CostSummary/CostSummary";
import Hr from "@/components/UI/Hr/Hr";
import ActionButtons from "@/components/Forms/ActionButtons/ActionButtons";
import { useAppSelector } from "@/hooks/useReduxHooks";
import {
  shippingOptions,
  paymentOptions,
} from "@/utils/shippingForm/constants";
import classes from "@/pages/Review/Review.module.css";

export default function Review() {
  const navigate = useNavigate();
  const {
    firstName,
    lastName,
    addressLine1,
    addressLine2,
    postalCode,
    city,
    country,
    phone,
    email,
    shippingOption,
    paymentMethod,
  } = useAppSelector((state) => state.shippingAddressAndPayment.draft);

  const chosenShippingMethod = shippingOptions.find(
    (option) => option.name === shippingOption,
  )?.label;

  const chosenPaymentMethod = paymentOptions.find(
    (option) => option.name === paymentMethod,
  )?.label;

  const redirectToAddressPage = () =>
    navigate("/cart/shipping/address&payment?step=1");

  const redirectToShipAndPayPage = () =>
    navigate("/cart/shipping/address&payment?step=2");

  const onNextButtonClick = () => navigate("/cart/confirm");

  const onBackButtonClick = () => navigate(-1);
  return (
    <section className={classes.section}>
      <div className={classes.wrapper}>
        <OrderSummaryList headingLevel={1} />
        <Hr customClass={classes["hr--vertical"]} />
        <CostSummary />
      </div>
      <Hr customClass={classes["hr--horizontal"]} />
      <div className={classes["order-details"]}>
        <div className={classes["order-detail"]}>
          <h2 className={classes["order-detail__heading"]}>Shipping Address</h2>
          <p className={classes["order-detail__value"]}>
            {firstName} {lastName}
            <br />
            {addressLine1} {addressLine2}
            <br />
            {postalCode} {city}
            <br />
            {country}
            <br />
            tel: {phone}
            <br />
            email: {email}
          </p>
          <button
            type="button"
            className={classes["order-detail__button"]}
            onClick={redirectToAddressPage}
            aria-label="Change shipping address"
          >
            Change
          </button>
        </div>
        <div className={classes["order-detail"]}>
          <h2 className={classes["order-detail__heading"]}>Shipping Method</h2>
          <p className={classes["order-detail__value"]}>
            <Markup content={chosenShippingMethod} />
          </p>
          <button
            type="button"
            className={classes["order-detail__button"]}
            onClick={redirectToShipAndPayPage}
            aria-label="Change shipping method"
          >
            Change
          </button>
        </div>

        <div className={classes["order-detail"]}>
          <h2 className={classes["order-detail__heading"]}>Payment Method</h2>
          <p className={classes["order-detail__value"]}>
            <Markup content={chosenPaymentMethod} />
          </p>
          <button
            type="button"
            className={classes["order-detail__button"]}
            onClick={redirectToShipAndPayPage}
            aria-label="Change payment method"
          >
            Change
          </button>
        </div>
      </div>
      <ActionButtons
        backButtonHandler={onBackButtonClick}
        nextButtonHandler={onNextButtonClick}
        customClass={classes.actionButtons}
        nextBttnCustomText="Confirm & Order"
      />
    </section>
  );
}
