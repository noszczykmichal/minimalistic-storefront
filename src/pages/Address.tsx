import { FormEvent } from "react";

import classes from "./Address.module.css";
import { useAppSelector } from "../hooks/useReduxHooks";
import OrderSummary from "../components/OrderSummary/OrderSummary";
import Button from "../components/UI/Button";
import { shippingAddressInputs } from "../utils/config";
import TextInput from "../components/Forms/Inputs/TextInput/TextInput";
import useRedirect from "../hooks/useRedirect";

function Address() {
  const { isFormValid } = useAppSelector((state) => state.shippingAddress);
  const redirect = useRedirect();

  const onProceedToBilling = (event: FormEvent) => {
    event.preventDefault();
    if (isFormValid) {
      redirect("/shipping&payment");
    }
  };

  return (
    <section className={classes.section}>
      <div className={classes["shipping-form__wrapper"]}>
        <h1>My contact data</h1>
        <p>Type in your address</p>
        <form className={classes.form}>
          {shippingAddressInputs.map((input) => (
            <TextInput key={input.name} inputDetails={input} />
          ))}
          <Button
            customClass={classes.form__button}
            clicked={onProceedToBilling}
            isDisabled={!isFormValid}
          >
            PROCEED TO BILLING
          </Button>
        </form>
      </div>

      <OrderSummary />
    </section>
  );
}

export default Address;
