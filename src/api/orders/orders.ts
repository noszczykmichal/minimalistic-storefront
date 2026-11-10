import { post } from "@/api/client";
import type { CurrencyLabel } from "@/types/types";
import type {
  AddressAndPaymentFormValues,
  ShippingAddress,
} from "@/utils/shippingForm/schemas";

interface OrderedProduct {
  productId: string;
  quantity: number;
  attributes: { name: string; value: string }[];
}

export interface Order {
  products: OrderedProduct[];
  billingCurrency: string;
  address: ShippingAddress;
  shippingMethod: AddressAndPaymentFormValues["shippingOption"];
  paymentMethod: AddressAndPaymentFormValues["paymentMethod"];
}

export const placeOrder = async (payload: Order) => {
  return post<unknown, unknown>({ url: "/orders", payload });
};
