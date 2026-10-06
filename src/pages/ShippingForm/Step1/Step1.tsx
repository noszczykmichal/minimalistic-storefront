import { UseFormRegister, FieldErrors } from "react-hook-form";

import { shippingAddressInputs } from "@/utils/shippingForm/constants";
import TextInput from "@/components/Forms/Inputs/TextInput/TextInput";
import { AddressAndPaymentFormInput } from "@/utils/shippingForm/schemas";

interface Step1Props {
  register: UseFormRegister<AddressAndPaymentFormInput>;
  errors: FieldErrors<AddressAndPaymentFormInput>;
}

export default function Step1({ register, errors }: Step1Props) {
  return (
    <>
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
    </>
  );
}
