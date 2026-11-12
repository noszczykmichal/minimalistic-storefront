import { get } from "@/api/client";

import type {
  Cost,
  ShippingOptionName,
  PaymentMethodName,
} from "@/types/types";
import { AxiosRequestConfig } from "axios";

interface ShippingOption {
  name: ShippingOptionName;
  costs: Cost[];
}

interface PaymentOption {
  name: PaymentMethodName;
  costs: Cost[];
}
interface ShippingAndPaymentOptionsResponse {
  shippingOptions: ShippingOption[];
  paymentOptions: PaymentOption[];
}

const getShippingAndPaymentCosts = ({
  config,
}: {
  config: AxiosRequestConfig;
}) =>
  get<ShippingAndPaymentOptionsResponse>({ url: "/checkout/options", config });

export default getShippingAndPaymentCosts;
