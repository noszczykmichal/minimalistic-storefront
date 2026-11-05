import { UseFormRegister, FieldErrors } from "react-hook-form";

import Fieldset from "@/components/Forms/Fieldset/Fieldset";
import { AddressAndPaymentFormInput } from "@/utils/shippingForm/schemas";
import { useAppSelector } from "@/hooks/useReduxHooks";

interface Step2Props {
  register: UseFormRegister<AddressAndPaymentFormInput>;
  errors: FieldErrors<AddressAndPaymentFormInput>;
}

export default function Step2({ register, errors }: Step2Props) {
  const shippingOptions = useAppSelector((state) => state.ui.shippingOptions);
  const paymentOptions = useAppSelector((state) => state.ui.paymentOptions);

  return (
    <>
      <Fieldset
        options={shippingOptions}
        legend="Choose a shipping method"
        registration={register("shippingOption")}
        error={errors.shippingOption?.message}
      />
      <Fieldset
        options={paymentOptions}
        legend="Choose a payment method"
        registration={register("paymentMethod")}
        error={errors.paymentMethod?.message}
      />
    </>
  );
}
