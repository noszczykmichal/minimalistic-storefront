import { post } from "@/api/client";
import type { Currency } from "@/types/types";
import type {
  AddressAndPaymentFormValues,
  ShippingAddress,
} from "@/utils/shippingForm/schemas";

interface OrderedProduct {
  productId: string;
  quantity: number;
}

interface Order {
  products: OrderedProduct[];
  billingCurrency: Currency;
  address: ShippingAddress;
  shippingMethod: AddressAndPaymentFormValues["shippingOption"];
  paymentMethod: AddressAndPaymentFormValues["paymentMethod"];
}

const placeOrder = async (payload: Order) => {
  try {
    const data = await post<unknown, unknown>({ url: "/orders", payload });
    console.log(data);
  } catch (err) {
    console.log(err);
  }
};

export default placeOrder;
