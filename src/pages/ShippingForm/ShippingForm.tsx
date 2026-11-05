import { useEffect, useState } from "react";
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
} from "@/utils/shippingForm/schemas";
import defaultShippingAndPaymentData from "@/utils/shippingForm/defaultValues";
import { shippingAndPaymentActions } from "@/store/shippingAddressAndPayment/shippingAddressAndPayment";
import { uiActions } from "@/store/ui/ui";
import classes from "@/pages/ShippingForm/ShippingForm.module.css";
import Step1 from "@/pages/ShippingForm/Step1/Step1";
import Step2 from "@/pages/ShippingForm/Step2/Step2";
import getShippingAndPaymentCosts from "@/api/checkout/checkout";
import {
  shippingOptionsLabels,
  paymentOptionsLabels,
} from "@/utils/shippingForm/constants";
import { isRequestCanceled } from "@/api/client";
import Skeleton from "./Step2/Skeleton/Skeleton";

const LAST_STEP = stepFieldNames.length;

const parseStep = (value: string | null) => {
  const step = Number(value);
  return Number.isInteger(step) && step >= 1 && step <= LAST_STEP ? step : 1;
};

export default function ShippingForm() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [hasError, setHasError] = useState<boolean | null>(null);
  const [attempt, setAttempt] = useState(0);
  const step = parseStep(searchParams.get("step"));
  const navigate = useNavigate();
  const { saveShippingAndPaymentOptions } = uiActions;
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

  useEffect(() => {
    const controller = new AbortController();

    async function fetchOptions() {
      try {
        const fetchedOptions = await getShippingAndPaymentCosts({
          config: { signal: controller.signal },
        });
        const { shippingOptions, paymentOptions } = fetchedOptions;
        const shippingOptionsWithCost = shippingOptions.map((option) => ({
          ...option,
          label: shippingOptionsLabels[option.name],
        }));
        const paymentOptionsWithCost = paymentOptions.map((option) => ({
          ...option,
          label: paymentOptionsLabels[option.name],
        }));

        dispatch(
          saveShippingAndPaymentOptions({
            shipping: shippingOptionsWithCost,
            payment: paymentOptionsWithCost,
          }),
        );
      } catch (err) {
        if (isRequestCanceled(err)) return;
        setHasError(true);
      }
    }

    fetchOptions();

    return () => controller.abort();
  }, [dispatch, saveShippingAndPaymentOptions, attempt]);

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

  const retryFetchOptions = () => {
    setHasError(null);
    setAttempt((prevState) => prevState + 1);
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
          {step === 2 && !hasError && (
            <Step2 register={register} errors={errors} />
          )}
          {step === 2 && hasError && <Skeleton retry={retryFetchOptions} />}
        </form>
        <ActionButtons backButtonHandler={goBack} nextButtonHandler={goNext} />
      </div>

      <OrderSummary />
    </section>
  );
}
