import { useState } from "react";

import Hr from "../../UI/Hr/Hr";
import ThumbnailArrow from "../../UI/ThumbnailArrow/ThumbnailArrow";
import useChangeQuantity from "../../../hooks/useChangeQuantity";
import { CartItem } from "../../../models/productSlice.models";
import { useAppSelector } from "../../../hooks/useReduxHooks";
import PlusIcon from "../Icons/PlusIcon/PlusIcon";
import MinusIcon from "../Icons/MinusIcon/MinusIcon";
import Attribute from "./Attribute/Attribute";
import classes from "./CartPageItem.module.css";

function CartPageItem({ itemDetails }: { itemDetails: CartItem }) {
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

  return (
    <>
      <Hr customClass={classes["cart-page__hr"]} />
      <li className={classes["cart-page__item"]}>
        {/* first column */}
        <div className={classes["column-wrapper"]}>
          <div className={classes["cart-item__product-details"]}>
            <h3 className={classes["product-details__title"]}>
              <span
                className={[classes.title__brand, classes.title__item].join(
                  " ",
                )}
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
              <Attribute attributeDetails={attribute} key={attribute.name} />
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
              aria-label="Increase quantity"
            >
              <PlusIcon />
            </button>
            <p className={classes["cart-actions__quantity"]}>{quantity}</p>
            <button
              type="button"
              className={classes["cart-actions__button"]}
              onClick={decreaseQuantityHandler}
              aria-label="Decrease quantity"
            >
              <MinusIcon />
            </button>
          </div>
          <div className={classes["image-container"]}>
            <div
              className={classes["image-container__image"]}
              style={{ backgroundImage: `url(${gallery[currentIndex]})` }}
            />
            {gallery.length > 1 ? (
              <div className={classes["image-container__scrolling-arrows"]}>
                <ThumbnailArrow
                  variant="left"
                  clicked={scrollingArrowsHandler}
                />
                <ThumbnailArrow
                  variant="right"
                  clicked={scrollingArrowsHandler}
                />
              </div>
            ) : null}
          </div>
        </div>
      </li>
    </>
  );
}

export default CartPageItem;
