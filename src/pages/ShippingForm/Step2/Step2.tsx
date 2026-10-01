import { UseFormRegister, FieldErrors } from "react-hook-form";

import { shippingOptions, paymentOptions } from "@/utils/form/constants";
import Fieldset from "@/components/Forms/Fieldset/Fieldset";
import { AddressAndPaymentFormInput } from "@/utils/form/schemas";

interface Step2Props {
  register: UseFormRegister<AddressAndPaymentFormInput>;
  errors: FieldErrors<AddressAndPaymentFormInput>;
}

export default function Step2({ register, errors }: Step2Props) {
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
