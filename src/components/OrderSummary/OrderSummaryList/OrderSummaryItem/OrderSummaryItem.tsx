import classes from "./OrderSummaryItem.module.css";
import { CartItem } from "../../../../models/productSlice.models";
import { useAppSelector } from "../../../../hooks/useReduxHooks";

function OrderSummaryItem({ cartItem }: { cartItem: CartItem }) {
  const { billingCurrency } = useAppSelector((state) => state.products);
  const { quantity, gallery, brand, name } = cartItem;

  const chosenAttributes = cartItem.attributes.map((attribute) => (
    <span key={attribute.name} className={classes["cart-item__attribute"]}>
      {" "}
      {attribute.name}{" "}
      {attribute.items.map((attributeItem) =>
        attributeItem.selected ? ` ${attributeItem.displayValue}` : null,
      )}
    </span>
  ));

  const currentPrice = cartItem.prices
    .map((price) =>
      price.currency.symbol === billingCurrency
        ? price.amount.toFixed(2)
        : null,
    )
    .find((price) => price !== null);

  return (
    <li className={classes["order-summary-item"]}>
      {/* first column */}
      <div className={classes["order-summary-item__image-wrapper"]}>
        <p className={classes["image-wrapper__product-quantity"]}>
          {quantity} x
        </p>
        <img
          className={classes["image-wrapper__thumbnail"]}
          src={`${gallery[0]}`}
          alt={`${brand} ${name}`}
        />
      </div>
      {/* second column */}
      <div className={classes["order-summary-item__description"]}>
        <p>
          {brand} {name}
          {chosenAttributes}
        </p>
      </div>
      <p className={classes["order-summary-item__price-tag"]}>
        {billingCurrency + currentPrice}
      </p>
    </li>
  );
}

export default OrderSummaryItem;
