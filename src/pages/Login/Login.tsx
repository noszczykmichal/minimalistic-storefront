import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import TextInput from "@/components/Forms/Inputs/TextInput/TextInput";
import { fullSchema, LoginFormOutput } from "@/utils/loginForm/schemas";
import Button from "@/components/UI/Button/Button";
import SignUpModal from "@/components/Login/SignUpModal/SignUpModal";
import { uiActions } from "@/store/ui/ui";
import { authActions } from "@/store/auth/auth";
import { useAppDispatch } from "@/hooks/useReduxHooks";
import { signIn } from "@/api/client";
import classes from "@/pages/Login/Login.module.css";

export default function Login() {
  const dispatch = useAppDispatch();
  const { modalToggle } = uiActions;
  const { saveSessionData } = authActions;

  const loginFormDefaultValues = {
    email: "",
    password: "",
  };

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(fullSchema),
    defaultValues: { ...loginFormDefaultValues },
    mode: "onTouched",
  });

  const onRegister = () => {
    dispatch(modalToggle(true));
  };

  const onSignIn = async (values: LoginFormOutput) => {
    try {
      const { data } = await signIn(values);
      // Marks the user as authenticated; GuestOnlyRoute, which wraps this page
      // in App.tsx, then redirects away from /login.
      dispatch(saveSessionData(data));
    } catch {
      setError("root", { message: "Invalid email or password" });
    }
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
            error={errors.email?.message}
          />
          <TextInput
            label="Password"
            type="password"
            registration={register("password")}
            autoComplete="off"
            error={errors.password?.message}
          />

          {errors.root && (
            <p role="alert" className="form-error">
              {errors.root.message}
            </p>
          )}

          <Button
            customClass={classes["login-form__signin"]}
            clicked={handleSubmit(onSignIn)}
          >
            Sign in
          </Button>
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

      <SignUpModal />
    </section>
  );
}
