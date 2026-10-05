import useChangeQuantity from "@/hooks/useChangeQuantity";
import { useAppSelector } from "@/hooks/useReduxHooks";
import { CartItem } from "@/types/types";
import Attribute from "@/components/Cart/CartPageItem/Attribute/Attribute";
import classes from "@/components/Cart/MiniCart/MiniCartItems/MiniCartItem/MiniCartItem.module.css";

export default function MiniCartItem({
  itemDetails,
}: {
  itemDetails: CartItem;
}) {
  const { internalID, quantity, gallery } = itemDetails;
  const { billingCurrency } = useAppSelector((state) => state.products);

  const filteredPrices = itemDetails.prices.filter(
    (price) => price.currency.symbol === billingCurrency,
  );
  const [currentPrice] = filteredPrices;

  const increaseQuantityHandler = useChangeQuantity(internalID, "addition");
  const decreaseQuantityHandler = useChangeQuantity(internalID, "subtraction");

  const productName = `${itemDetails.brand} ${itemDetails.name}`;
  // At quantity 1 the "-" button removes the item, so say so.
  const decreaseLabel =
    quantity > 1
      ? `Decrease quantity of ${productName}`
      : `Remove ${productName} from cart`;

  return (
    <li className={classes["cart-item"]}>
      <div className={classes["column-wrapper"]}>
        <div className={classes["cart-item__product-details"]}>
          <h3 className={classes["product-details__title"]}>
            <span className={classes.title__item}>{itemDetails.brand}</span>
            <span className={classes.title__item}>{itemDetails.name}</span>
          </h3>
          <p className={classes["product-details__price"]}>
            {billingCurrency}
            {currentPrice.amount.toFixed(2)}
          </p>
        </div>

        <div className={classes["cart-item__product-attributes"]}>
          {itemDetails.attributes.map((attribute) => (
            <Attribute
              attributeDetails={attribute}
              isInMiniView
              key={attribute.name}
            />
          ))}
        </div>
      </div>

      <div className={classes["column-wrapper--cart-actions"]}>
        <button
          type="button"
          className={classes["cart-actions__button"]}
          onClick={increaseQuantityHandler}
          aria-label={`Increase quantity of ${productName}`}
        >
          +
        </button>
        <p
          className={classes["cart-actions__quantity"]}
          aria-live="polite"
          aria-atomic="true"
        >
          <span className="visually-hidden">Quantity of {productName}: </span>
          {quantity}
        </p>
        <button
          type="button"
          className={classes["cart-actions__button"]}
          onClick={decreaseQuantityHandler}
          aria-label={decreaseLabel}
        >
          -
        </button>
      </div>
      <div
        className={classes["image-container"]}
        style={{ backgroundImage: `url(${gallery[0]})` }}
      />
    </li>
  );
}
