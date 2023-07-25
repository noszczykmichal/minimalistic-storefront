import classes from "./Address.module.css";
import { useAppSelector } from "../hooks/useReduxHooks";
import OrderSummary from "../components/OrderSummary/OrderSummary";
import { shippingAddressInputs } from "../utils/config";
import TextInput from "../components/Forms/Inputs/TextInput/TextInput";
import ActionButtons from "../components/Forms/ActionButtons/ActionButtons";

function Address() {
  const { isFormValid } = useAppSelector((state) => state.shippingAddress);

  return (
    <section className={classes.section}>
      <div className={classes["shipping-form__wrapper"]}>
        <h1>My contact data</h1>
        <p>Type in your address</p>
        <form className={classes.form}>
          {shippingAddressInputs.map((input) => (
            <TextInput key={input.name} inputDetails={input} />
          ))}

          <ActionButtons
            isNextBttnDisabled={!isFormValid}
            nextBttnPath="/cart/shipping&payment"
          />
        </form>
      </div>

      <OrderSummary />
    </section>
  );
}

export default Address;
