import { Markup } from "interweave";

import OrderSummaryList from "../components/OrderSummary/OrderSummaryList/OrderSummaryList";
import CostSummary from "../components/OrderSummary/CostSummary/CostSummary";
import Hr from "../components/UI/Hr";
import ActionButtons from "../components/Forms/ActionButtons/ActionButtons";
import { useAppSelector } from "../hooks/useReduxHooks";
import { shippingOptions, paymentOptions } from "../utils/config";
import classes from "./Review.module.css";

function Review() {
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

  return (
    <section className={classes.section}>
      <div className={classes.wrapper}>
        <OrderSummaryList />
        <Hr customClass={classes.hr} />
        <CostSummary />
      </div>
      <Hr customClass={classes.gr} />
      <table className={classes.table}>
        <thead>
          <tr>
            <th className={classes.th}>Shipping Address</th>
            <th className={classes.th}>Shipping Method</th>
            <th className={classes.th}>Payment Method</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className={classes.th}>
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
            </td>
            <td className={classes.th}>
              <Markup content={chosenShippingMethod} />
            </td>
            <td className={classes.th}>
              {" "}
              <Markup content={chosenPaymentMethod} />
            </td>
          </tr>
        </tbody>
      </table>
      <ActionButtons isNextBttnDisabled={false} nextBttnPath="" />
    </section>
  );
}

export default Review;
