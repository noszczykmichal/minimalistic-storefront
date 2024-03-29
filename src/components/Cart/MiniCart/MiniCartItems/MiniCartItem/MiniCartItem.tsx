import useChangeQuantity from "../../../../../hooks/useChangeQuantity";
import { useAppSelector } from "../../../../../hooks/useReduxHooks";
import { CartItem } from "../../../../../models/productSlice.models";
import Attribute from "../../../CartPageItem/Attribute/Attribute";
import classes from "./MiniCartItem.module.css";

function MiniCartItem({ itemDetails }: { itemDetails: CartItem }) {
  const { internalID, quantity, gallery } = itemDetails;
  const { billingCurrency } = useAppSelector((state) => state.products);

  const filteredPrices = itemDetails.prices.filter(
    (price) => price.currency.symbol === billingCurrency,
  );
  const [currentPrice] = filteredPrices;

  const increaseQuantityHandler = useChangeQuantity(internalID, "addition");
  const decreaseQuantityHandler = useChangeQuantity(internalID, "subtraction");

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
        >
          +
        </button>
        <p className={classes["cart-actions__quantity"]}>{quantity}</p>
        <button
          type="button"
          className={classes["cart-actions__button"]}
          onClick={decreaseQuantityHandler}
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

export default MiniCartItem;
