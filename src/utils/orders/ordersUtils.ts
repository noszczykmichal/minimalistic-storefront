import type { CartItem, Currency } from "@/types/types";
import type {
  AddressAndPaymentFormValues,
  ShippingAddress,
} from "@/utils/shippingForm/schemas";

interface OrderObjectData {
  cart: CartItem[];
  billingCurrency: Currency;
  address: ShippingAddress;
  shippingMethod: AddressAndPaymentFormValues["shippingOption"];
  paymentMethod: AddressAndPaymentFormValues["paymentMethod"];
}

const buildOrderObject = ({
  cart,
  billingCurrency,
  address,
  shippingMethod,
  paymentMethod,
}: OrderObjectData) => {
  const orderedProducts = cart.map(({ id, quantity, attributes }) => ({
    productId: id,
    quantity,
    attributes: attributes.map((attribute) => {
      const attributeName = attribute.name;
      const selectedAttribute = attribute.items.find(
        (attributeItem) => attributeItem.selected === true,
      );

      return {
        name: attributeName,
        value: selectedAttribute?.value,
      };
    }),
  }));

  return {
    products: orderedProducts,
    billingCurrency: billingCurrency.label,
    address,
    shippingMethod,
    paymentMethod,
  };
};

export default buildOrderObject;
