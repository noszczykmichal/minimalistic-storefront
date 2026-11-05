import { Markup } from "interweave";
import { useNavigate } from "react-router";

import OrderSummaryList from "@/components/OrderSummary/OrderSummaryList/OrderSummaryList";
import CostSummary from "@/components/OrderSummary/CostSummary/CostSummary";
import Hr from "@/components/UI/Hr/Hr";
import ActionButtons from "@/components/Forms/ActionButtons/ActionButtons";
import { useAppSelector } from "@/hooks/useReduxHooks";
import placeOrder from "@/api/orders/orders";
import classes from "@/pages/Review/Review.module.css";
import { shippingAddressSchema } from "@/utils/shippingForm/schemas";
import buildOrderObject from "@/utils/orders/ordersUtils";

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
  } = useAppSelector((state) => state.shippingAddressAndPayment.draft);
  const { shippingOption, paymentMethod, ...addressFields } = useAppSelector(
    (state) => state.shippingAddressAndPayment.draft,
  );

  const authenticationStatus = useAppSelector((state) => state.auth.status);
  const isAuthenticated = authenticationStatus === "authenticated";
  const billingCurrency = useAppSelector(
    (state) => state.products.billingCurrency,
  );
  const cart = useAppSelector((state) => state.products.cart);
  const availableShippingOptions = useAppSelector(
    (state) => state.ui.shippingOptions,
  );
  const availablePaymentOptions = useAppSelector(
    (state) => state.ui.paymentOptions,
  );

  const chosenShippingMethod = availableShippingOptions.find(
    (option) => option.name === shippingOption,
  );

  const chosenPaymentMethod = availablePaymentOptions.find(
    (option) => option.name === paymentMethod,
  );

  const redirectToAddressPage = () =>
    navigate("/cart/shipping/address&payment?step=1");

  const redirectToShipAndPayPage = () =>
    navigate("/cart/shipping/address&payment?step=2");

  const onNextButtonClick = async () => {
    const address = shippingAddressSchema.safeParse(addressFields);

    if (!address.success || !chosenShippingMethod || !chosenPaymentMethod) {
      return;
    }

    if (isAuthenticated) {
      const order = buildOrderObject({
        cart,
        billingCurrency,
        address: address.data,
        shippingMethod: chosenShippingMethod?.name,
        paymentMethod: chosenPaymentMethod?.name,
      });

      console.log("order", order);

      await placeOrder(order);

      return;
    }

    navigate("/cart/confirm");
  };

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
            <Markup content={chosenShippingMethod?.label} />
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
            <Markup content={chosenPaymentMethod?.label} />
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
