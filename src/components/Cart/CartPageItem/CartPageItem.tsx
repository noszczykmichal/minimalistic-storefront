import { useState } from "react";

import classes from "./CartPageItem.module.css";
import Hr from "../../UI/Hr";
import ThumbnailArrow from "../../UI/ThumbnailArrow";
import useChangeQuantity from "../../../hooks/useChangeQuantity";
import { CartItem } from "../../../models/productSlice.models";
import { useAppSelector } from "../../../hooks/useReduxHooks";

function CartPageItem({ itemDetails }: { itemDetails: CartItem }) {
  const { internalID, name, brand, gallery, quantity } = itemDetails;
  const [currentIndex, setCurrentIndex] = useState(0);
  const billingCurrency = useAppSelector(
    (state) => state.products.billingCurrency,
  );

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
      <Hr />
      <li className={classes["cart-page__item"]}>
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
              <div
                key={attribute.name}
                className={classes["product-attribute"]}
              >
                <h3 className={classes["product-attribute__label"]}>
                  {attribute.name}:
                </h3>
                <div className={classes["product-attribute__values"]}>
                  {attribute.items.map((attributeItem) => {
                    const textAttributeClasses = attributeItem.selected
                      ? [
                          classes["product-attribute__value"],
                          classes["product-attribute__value--selected"],
                        ]
                      : [classes["product-attribute__value"]];

                    let content = (
                      <button
                        type="button"
                        key={attributeItem.displayValue}
                        className={textAttributeClasses.join(" ")}
                      >
                        {attributeItem.value}
                      </button>
                    );

                    if (attribute.name === "Color") {
                      const colourAttributeClasses = attributeItem.selected
                        ? [
                            classes["product-attribute__value--color"],
                            classes["product-attribute__value--color-selected"],
                          ]
                        : [classes["product-attribute__value--color"]];
                      content = (
                        <button
                          type="button"
                          key={attributeItem.displayValue}
                          className={colourAttributeClasses.join(" ")}
                          style={{
                            backgroundColor:
                              attributeItem.value === "#FFFFFF"
                                ? "#F0F0F0"
                                : `${attributeItem.value}`,
                          }}
                        >
                          {attributeItem.displayValue}
                        </button>
                      );
                    }

                    return content;
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className={classes["column-wrapper--cart-actions"]}>
          <div className={classes["cart-actions"]}>
            <button
              type="button"
              className={classes["cart-actions__button"]}
              onClick={increaseQuantityHandler}
            >
              <svg
                width="15"
                height="1"
                viewBox="0 0 15 1"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1 0.5H16"
                  stroke="#1D1F22"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <svg
                className={classes["button__svg-y-axis"]}
                width="1"
                height="15"
                viewBox="0 0 1 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0.5 1V16"
                  stroke="#1D1F22"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <p className={classes["cart-actions__quantity"]}>{quantity}</p>
            <button
              type="button"
              className={classes["cart-actions__button"]}
              onClick={decreaseQuantityHandler}
            >
              <svg
                width="17"
                height="1"
                viewBox="0 0 17 1"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1 0.5H16"
                  stroke="#1D1F22"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
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
