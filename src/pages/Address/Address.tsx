import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useAppSelector, useAppDispatch } from "@/hooks/useReduxHooks";
import OrderSummary from "@/components/OrderSummary/OrderSummary";
import { shippingAddressInputs } from "@/utils/form/constants";
import TextInput from "@/components/Forms/Inputs/TextInput/TextInput";
import ActionButtons from "@/components/Forms/ActionButtons/ActionButtons";
import classes from "@/pages/Address/Address.module.css";
import { ShippingAddress, shippingAddressSchema } from "@/utils/form/schemas";
import { shippingAddressActions } from "@/store/shippingAddress";

const EMPTY_ADDRESS: ShippingAddress = {
  firstName: "",
  lastName: "",
  addressLine1: "",
  addressLine2: "",
  city: "",
  postalCode: "",
  country: "",
  phone: "",
  email: "",
};

export default function Address() {
  const draft = useAppSelector((state) => state.shippingAddress.draft);
  const dispatch = useAppDispatch();

  const {
    register,
    watch,
    formState: { errors, isValid },
  } = useForm<ShippingAddress>({
    resolver: zodResolver(shippingAddressSchema),
    defaultValues: { ...EMPTY_ADDRESS, ...draft },
    mode: "onTouched",
  });

  useEffect(() => {
    const subscription = watch((values) => {
      dispatch(shippingAddressActions.saveDraft(values));
    });

    return () => subscription.unsubscribe();
  }, [watch, dispatch]);

  return (
    <section className={classes.section}>
      <div className={classes["shipping-form__wrapper"]}>
        <h1>My contact data</h1>
        <p>Type in your address</p>
        <form className={classes.form} noValidate>
          {shippingAddressInputs.map((input) => (
            <TextInput
              key={input.name}
              label={input.label}
              type={input.type}
              autoComplete={input.autoComplete}
              registration={register(input.name)}
              error={errors[input.name]?.message}
            />
          ))}

          <ActionButtons
            isNextBttnDisabled={!isValid}
            nextBttnPath="/cart/shipping&payment"
          />
        </form>
      </div>

      <OrderSummary />
    </section>
  );
}
