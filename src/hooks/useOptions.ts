import { useState, useEffect } from "react";

import { uiActions } from "@/store/ui/ui";
import getShippingAndPaymentCosts from "@/api/checkout/checkout";
import { useAppDispatch } from "@/hooks/useReduxHooks";
import {
  shippingOptionsLabels,
  paymentOptionsLabels,
} from "@/utils/shippingForm/constants";
import { isRequestCanceled } from "@/api/client";

/** This hook fetches shipping and payment options from API. */
export default function useOptions() {
  const [attempt, setAttempt] = useState(0);
  const [hasError, setHasError] = useState<boolean | null>(null);
  const { saveShippingAndPaymentOptions } = uiActions;
  const dispatch = useAppDispatch();

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

  const retryFetchOptions = () => {
    setHasError(null);
    setAttempt((prevState) => prevState + 1);
  };

  return { retryFetchOptions, hasError };
}
