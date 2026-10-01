import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useAppSelector, useAppDispatch } from "@/hooks/useReduxHooks";
import OrderSummary from "@/components/OrderSummary/OrderSummary";
import ActionButtons from "@/components/Forms/ActionButtons/ActionButtons";
import {
  fullSchema,
  isFormFieldName,
  stepFieldNames,
} from "@/utils/form/schemas";
import defaultShippingAndPaymentData from "@/utils/form/defaultValues";
import { shippingAndPaymentActions } from "@/store/shippingAddressAndPayment";
import classes from "@/pages/ShippingForm/ShippingForm.module.css";
import Step1 from "./Step1/Step1";
import Step2 from "./Step2/Step2";

const LAST_STEP = stepFieldNames.length;

const parseStep = (value: string | null) => {
  const step = Number(value);
  return Number.isInteger(step) && step >= 1 && step <= LAST_STEP ? step : 1;
};

export default function ShippingForm() {
  const [searchParams, setSearchParams] = useSearchParams();
  const step = parseStep(searchParams.get("step"));
  const navigate = useNavigate();
  const draft = useAppSelector(
    (state) => state.shippingAddressAndPayment.draft,
  );
  const dispatch = useAppDispatch();
  const goToStep = (nextStep: number) => {
    setSearchParams({ step: String(nextStep) });
  };

  const {
    register,
    subscribe,
    trigger,
    getFieldState,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(fullSchema),
    defaultValues: { ...defaultShippingAndPaymentData, ...draft },
    mode: "onTouched",
  });

  useEffect(() => {
    const unsubscribe = subscribe({
      formState: { values: true },
      callback: ({ values, name, type }) => {
        dispatch(shippingAndPaymentActions.saveDraft(values));

        if (
          type === "change" &&
          name &&
          isFormFieldName(name) &&
          getFieldState(name).invalid
        ) {
          trigger(name);
        }
      },
    });

    return unsubscribe;
  }, [subscribe, dispatch, getFieldState, trigger]);

  const goNext = async () => {
    const fields = stepFieldNames[step - 1];
    const isStepValid = await trigger(fields, { shouldFocus: true });

    if (!isStepValid) {
      return null;
    }

    if (step < LAST_STEP) {
      return goToStep(step + 1);
    }

    return navigate("/cart/review");
  };

  const goBack = () => {
    if (step > 1) {
      goToStep(step - 1);
    } else {
      navigate("/cart");
    }
  };

  return (
    <section className={classes.section}>
      <div className={classes.form__wrapper}>
        <h1>{step === 1 ? "My contact data" : "Shipping and Payment"}</h1>
        {step === 1 && (
          <p className={classes.form_legend}>Type in your address</p>
        )}
        <form className={classes.form} noValidate>
          {step === 1 && <Step1 register={register} errors={errors} />}
          {step === 2 && <Step2 register={register} errors={errors} />}
        </form>
        <ActionButtons backButtonHandler={goBack} nextButtonHandler={goNext} />
      </div>

      <OrderSummary />
    </section>
  );
}
