import { useForm } from "react-hook-form";

import Modal from "@/components/UI/Modal/Modal";
import { zodResolver } from "@hookform/resolvers/zod";
import { fullSchema } from "@/utils/signUpForm/schema";
import TextInput from "@/components/Forms/Inputs/TextInput/TextInput";
import singUpFormConfig from "@/utils/signUpForm/constants";
import defaultValues from "@/utils/signUpForm/defaultValues";
import classes from "@/components/Login/SignUpModal/SignUpModal.module.css";

export default function RegisterModal() {
  const {
    register,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(fullSchema),
    defaultValues,
    mode: "onTouched",
  });

  return (
    <Modal header="Sign up" className={classes["signup-modal"]}>
      <form action="" className={classes.modal__form} noValidate>
        {singUpFormConfig.map((input) => (
          <TextInput
            key={input.name}
            label={input.label}
            type={input.type}
            autoComplete={input.autoComplete}
            registration={register(input.name)}
            error={errors[input.name]?.message}
          />
        ))}
      </form>
    </Modal>
  );
}
