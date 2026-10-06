import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import TextInput from "@/components/Forms/Inputs/TextInput/TextInput";
import fullSchema from "@/utils/loginForm/schemas";
import Button from "@/components/UI/Button/Button";
import RegisterModal from "@/components/Register/RegisterModal/RegisterModal";
import { uiActions } from "@/store/uiSlice";
import { useAppDispatch } from "@/hooks/useReduxHooks";
import classes from "@/pages/Login/Login.module.css";

export default function Login() {
  const dispatch = useAppDispatch();
  const {
    backdropVisibilityToggle,
    backdropTypeToggle,
    openRegistrationModal,
  } = uiActions;

  const loginFormDefaultValues = {
    email: "",
    password: "",
  };

  const { register } = useForm({
    resolver: zodResolver(fullSchema),
    defaultValues: { ...loginFormDefaultValues },
    mode: "onTouched",
  });

  const onRegister = () => {
    dispatch(backdropVisibilityToggle(true));
    dispatch(backdropTypeToggle("dark"));
    dispatch(openRegistrationModal());
  };

  return (
    <section className={classes.section__login}>
      <div className={classes["login-form-wrapper"]}>
        <form action="" noValidate className={classes["login-form"]}>
          <TextInput
            label="E-mail:"
            type="email"
            registration={register("email")}
            autoComplete="email"
          />
          <TextInput
            label="Password"
            type="password"
            registration={register("password")}
            autoComplete="off"
          />
          <Button customClass={classes["login-form__signin"]}>Sign in</Button>
        </form>
        <p>
          Don&apos;t have an account?
          <button
            type="button"
            className={classes["login-form__register"]}
            onClick={onRegister}
          >
            Register now
          </button>
        </p>
      </div>

      <RegisterModal />
    </section>
  );
}
