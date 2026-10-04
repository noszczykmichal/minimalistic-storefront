import { useState } from "react";

import ThumbnailArrow from "@/components/UI/ThumbnailArrow/ThumbnailArrow";
import useChangeQuantity from "@/hooks/useChangeQuantity";
import { CartItem } from "@/types/types";
import { useAppSelector } from "@/hooks/useReduxHooks";
import PlusIcon from "@/components/Cart/Icons/PlusIcon/PlusIcon";
import MinusIcon from "@/components/Cart/Icons/MinusIcon/MinusIcon";
import Attribute from "@/components/Cart/CartPageItem/Attribute/Attribute";
import classes from "@/components/Cart/CartPageItem/CartPageItem.module.css";

export default function CartPageItem({
  itemDetails,
}: {
  itemDetails: CartItem;
}) {
  const { internalID, name, brand, gallery, quantity } = itemDetails;
  const [currentIndex, setCurrentIndex] = useState(0);
  const { billingCurrency } = useAppSelector((state) => state.products);

  const filteredPrices = itemDetails.prices.filter(
    (price) => price.currency.symbol === billingCurrency,
  );
  const [currentPrice] = filteredPrices;

  const scrollingArrowsHandler = (event: React.MouseEvent) => {
    const regex = /right/;
    const eventTarget = event.target as HTMLButtonElement;
    const attachedClass = Array.from(eventTarget.classList).join(" ");
    const isRightArrow = regex.test(attachedClass);
    if (isRightArrow) {
      setCurrentIndex((prevIndex) =>
        prevIndex === gallery.length - 1 ? 0 : prevIndex + 1,
      );
    } else {
      setCurrentIndex((prevIndex) =>
        prevIndex === 0 ? gallery.length - 1 : prevIndex - 1,
      );
    }
  };

  const increaseQuantityHandler = useChangeQuantity(internalID, "addition");
  const decreaseQuantityHandler = useChangeQuantity(internalID, "subtraction");

  const productName = `${brand} ${name}`;
  // At quantity 1 the "-" button removes the item, so say so.
  const decreaseLabel =
    quantity > 1
      ? `Decrease quantity of ${productName}`
      : `Remove ${productName} from cart`;

  return (
    <li className={classes["cart-page__item"]}>
      {/* first column */}
      <div className={classes["column-wrapper"]}>
        <div className={classes["cart-item__product-details"]}>
          <h3 className={classes["product-details__title"]}>
            <span
              className={[classes.title__brand, classes.title__item].join(" ")}
            >
              {brand}
            </span>
            <span
              className={[classes.title__name, classes.title__item].join(" ")}
            >
              {name}
            </span>
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
              isInMiniView={false}
              key={attribute.name}
            />
          ))}
        </div>
      </div>
      {/* second column */}
      <div className={classes["column-wrapper--cart-actions"]}>
        <div className={classes["cart-actions"]}>
          <button
            type="button"
            className={classes["cart-actions__button"]}
            onClick={increaseQuantityHandler}
            aria-label={`Increase quantity of ${productName}`}
          >
            <PlusIcon />
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
            <MinusIcon />
          </button>
        </div>
        <div className={classes["image-container"]}>
          <img
            className={classes["image-container__image"]}
            src={`${gallery[currentIndex]}`}
            alt={productName}
          />
          {gallery.length > 1 ? (
            <div className={classes["image-container__scrolling-arrows"]}>
              <ThumbnailArrow variant="left" clicked={scrollingArrowsHandler} />
              <ThumbnailArrow
                variant="right"
                clicked={scrollingArrowsHandler}
              />
            </div>
          ) : null}
        </div>
      </div>
    </li>
  );
}
