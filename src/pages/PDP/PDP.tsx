/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { useId, useState } from "react";

import { Markup } from "interweave";

import Button from "@/components/UI/Button/Button";
import { productActions } from "@/store/products";
import { uiActions } from "@/store/uiSlice";
import { ProductType } from "@/types/types";
import { useAppDispatch, useAppSelector } from "@/hooks/useReduxHooks";
import classes from "@/pages/PDP/PDP.module.css";
import MissingAttributesModal from "@/components/UI/MissingAttributesModal/MissingAttributesModal";

export default function PDP() {
  const dispatch = useAppDispatch();
  const { currentPDP: displayedProduct, billingCurrency } = useAppSelector(
    (state) => state.products,
  );

  const { addProductToCart } = productActions;
  const { backdropVisibilityToggle, backdropTypeToggle, modalToggle } =
    uiActions;
  const [mainUrl, setMainUrl] = useState(displayedProduct!.gallery[0]);
  const [product, setProduct] = useState(displayedProduct);
  const [notSelected, setNotSelected] = useState<(string | null)[]>([]);
  const attributeIdPrefix = useId();

  const imageToggle = (imageURL: string) => {
    setMainUrl(imageURL);
  };

  const onAttributeValueSelect = (
    attributeName: string,
    selectedValue: string,
  ) => {
    const updatedProductAttributes = product!.attributes.map((attribute) => {
      if (attribute.name !== attributeName) {
        return attribute;
      }

      const updatedItems = attribute.items.map((item) => {
        const { selected, ...itemWithoutSelected } = item;

        return item.value === selectedValue
          ? { ...itemWithoutSelected, selected: true }
          : itemWithoutSelected;
      });

      return { ...attribute, items: updatedItems };
    });

    setProduct((prevState) => ({
      ...(prevState as ProductType),
      attributes: updatedProductAttributes,
    }));
  };

  const onAddProductToCart = () => {
    const notSelectedAttributes = product!.attributes
      .map((attribute) => {
        const attributeItems = attribute.items;
        const isSelected = attributeItems.some((item) => item.selected);

        return !isSelected ? attribute.name : null;
      })
      .filter((element) => typeof element === "string");

    setNotSelected(notSelectedAttributes);

    if (notSelectedAttributes.length > 0) {
      dispatch(modalToggle(true));
      dispatch(backdropTypeToggle("dark"));
      dispatch(backdropVisibilityToggle(true));
    } else {
      dispatch(addProductToCart(product));
    }
  };

  const currentPrice = [...displayedProduct!.prices].filter(
    (price) => price.currency.symbol === billingCurrency,
  );

  return (
    <section className={classes.section}>
      <MissingAttributesModal notSelected={notSelected} />
      {/* 1st column */}
      <div className={classes["thumbnails-wrapper"]}>
        {displayedProduct!.gallery.map((imageURL) => (
          <div
            className={classes["thumbnails-wrapper__thumbnail"]}
            key={imageURL.substring(-2)}
            style={{ backgroundImage: `url(${imageURL})` }}
            onClick={() => imageToggle(imageURL)}
          />
        ))}
      </div>
      {/* 2nd column */}
      <img
        className={classes["main-image"]}
        src={mainUrl}
        alt={displayedProduct!.id}
      />
      {/* 3rd column */}
      <div className={classes["cart-actions"]}>
        <h1 className={classes["cart-actions__title"]}>
          <span className={classes.title__brand}>
            {displayedProduct!.brand}
          </span>
          <span className={classes.title__name}>{displayedProduct!.name}</span>
        </h1>

        <div className={classes["product-attributes"]}>
          {product!.attributes.map((attribute, attributeIndex) => {
            const isColor = attribute.name === "Color";
            const labelId = `${attributeIdPrefix}-${attributeIndex}`;

            return (
              <div
                key={attribute.name}
                className={classes["product-attribute"]}
              >
                <h2
                  id={labelId}
                  className={classes["product-attribute__label"]}
                >
                  {attribute.name}:
                </h2>
                <div
                  role="group"
                  aria-labelledby={labelId}
                  className={classes["product-attribute__values"]}
                >
                  {attribute.items.map((attributeItem) => {
                    const baseClass = isColor
                      ? classes["product-attribute__value--color"]
                      : classes["product-attribute__value"];
                    const selectedClass = isColor
                      ? classes["product-attribute__value--color-selected"]
                      : classes["product-attribute__value--selected"];

                    return (
                      <button
                        type="button"
                        key={attributeItem.value}
                        className={
                          attributeItem.selected
                            ? [baseClass, selectedClass].join(" ")
                            : baseClass
                        }
                        style={
                          isColor
                            ? {
                                backgroundColor:
                                  attributeItem.value === "#FFFFFF"
                                    ? "#F0F0F0"
                                    : attributeItem.value,
                              }
                            : undefined
                        }
                        aria-label={
                          isColor ? attributeItem.displayValue : undefined
                        }
                        aria-pressed={!!attributeItem.selected}
                        onClick={() =>
                          onAttributeValueSelect(
                            attribute.name,
                            attributeItem.value,
                          )
                        }
                      >
                        {attributeItem.value}
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
          <div className={classes["product-price"]}>
            <h2 className={classes["product-price__label"]}>Price:</h2>
            <p className={classes["product-price__value"]}>
              {currentPrice[0].currency.symbol}
              {currentPrice[0].amount}
            </p>
          </div>
        </div>
        <Button
          isDisabled={!displayedProduct!.inStock}
          clicked={onAddProductToCart}
          customClass={classes["cart-actions__button"]}
        >
          Add to cart
        </Button>
        <div className={classes.description}>
          <Markup content={displayedProduct!.description} />
        </div>
      </div>
    </section>
  );
}
