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

  const currentPrice = cartItem.prices.map((price) =>
    price.currency.symbol === billingCurrency ? price.amount.toFixed(2) : null,
  );

  return (
    <li className={classes["cart-item"]}>
      {/* first column */}
      <div className={classes["cart-item__image-wrapper"]}>
        <p className={classes["cart-item__product-quantity"]}>{quantity} x</p>
        <div
          className={classes["cart-item__thumbnail"]}
          style={{ backgroundImage: `url(${gallery[0]})` }}
        />
      </div>
      {/* second column */}
      <div className={classes["cart-item__description"]}>
        <p>
          {brand} {name}
          {chosenAttributes}
        </p>
      </div>
      <p className={classes["cart-item__price-tag"]}>
        {billingCurrency}
        {currentPrice}
      </p>
    </li>
  );
}

export default OrderSummaryItem;
