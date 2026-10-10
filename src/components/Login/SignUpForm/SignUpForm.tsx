import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { fullSchema, type SignUpFormOutput } from "@/utils/signUpForm/schema";
import { uiActions } from "@/store/ui/ui";
import { useAppDispatch } from "@/hooks/useReduxHooks";
import TextInput from "@/components/Forms/Inputs/TextInput/TextInput";
import singUpFormConfig from "@/utils/signUpForm/constants";
import defaultValues from "@/utils/signUpForm/defaultValues";
import ActionButtons from "@/components/Forms/ActionButtons/ActionButtons";
import { signUp } from "@/api/client";
import classes from "@/components/Login/SignUpForm/SignUpForm.module.css";

export default function SignUpForm() {
  const dispatch = useAppDispatch();
  const { modalToggle, toastVisibilityToggle } = uiActions;

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(fullSchema),
    defaultValues,
    mode: "onTouched",
  });

  const closeModal = () => {
    dispatch(modalToggle(false));
  };

  const handleToast = () => {
    setTimeout(() => dispatch(toastVisibilityToggle(true)), 500);
    setTimeout(() => dispatch(toastVisibilityToggle(false)), 5500);
  };

  const onSingUp = async (values: SignUpFormOutput) => {
    const { confirmPassword, ...payload } = values;

    try {
      await signUp(payload);
      closeModal();
      handleToast();
    } catch {
      setError("root", {
        message: "Sign up failed. Please try again.",
      });
    }
  };

  return (
    <>
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
      {errors.root && (
        <p role="alert" className="form-error">
          {errors.root.message}
        </p>
      )}
      <ActionButtons
        backBttnCustomText="Cancel"
        nextBttnCustomText="Sign up"
        backButtonHandler={closeModal}
        nextButtonHandler={handleSubmit(onSingUp)}
      />
    </>
  );
}
