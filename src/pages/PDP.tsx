/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createPortal } from "react-dom";
import { Markup } from "interweave";

import classes from "./PDP.module.css";
import Button from "../components/UI/Button";
import Modal from "../components/UI/Modal";
import { productActions } from "../store/productsSlice";
import { uiActions } from "../store/uiSlice";

function PDP() {
  const dispatch = useDispatch();
  const { currentPDP: displayedProduct, billingCurrency } = useSelector(
    (state) => state.products,
  );

  const { addProductToCart } = productActions;
  const { backdropVisibilityToggle, backdropTypeToggle, modalToggle } =
    uiActions;
  const [mainUrl, setMainUrl] = useState(displayedProduct.gallery[0]);
  const [product, setProduct] = useState(displayedProduct);
  const [notSelected, setNotSelected] = useState([]);

  const imageToggle = (imageURL) => {
    setMainUrl(imageURL);
  };

  const classNameToggler = (className, parentElement, event) => {
    const childrenOfParent = [...parentElement.children];

    childrenOfParent.forEach((element) =>
      element.classList.remove(classes[`${className}`]),
    );

    childrenOfParent.forEach((element) =>
      element === event.target
        ? element.classList.add(classes[`${className}`])
        : null,
    );
  };

  const onAttributeValueSelect = (event) => {
    const parentEl = event.target.parentElement;
    const searchedAttributeType = parentEl.getAttribute("attributeType");
    const productAttributes = product.attributes;
    const searchedAttribItem = event.target.innerText;

    if (searchedAttributeType !== "Color") {
      classNameToggler("product-attribute__value--selected", parentEl, event);
    } else {
      classNameToggler(
        "product-attribute__value--color-selected",
        parentEl,
        event,
      );
    }

    const updatedProductAttributes = productAttributes.map((attribute) => {
      let updatedItems = attribute.items;

      if (attribute.name === searchedAttributeType) {
        const attributeItems = JSON.parse(JSON.stringify(attribute.items));
        const clearedOfSelected = attributeItems.map((item) => {
          const updatedItem = { ...item };
          if (item.selected) {
            delete updatedItem.selected;
          }
          return updatedItem;
        });

        updatedItems = clearedOfSelected.map((attributeItem) =>
          attributeItem.value === searchedAttribItem
            ? { ...attributeItem, selected: true }
            : attributeItem,
        );
      }

      return { ...attribute, items: updatedItems };
    });

    setProduct((prevState) => ({
      ...prevState,
      attributes: updatedProductAttributes,
    }));
  };

  const onAddProductToCart = () => {
    const checkNotSelected = product.attributes
      .map((attribute) => {
        const attributeItems = attribute.items;
        const isSelected = attributeItems.some((item) => item.selected);

        return !isSelected && attribute.name;
      })
      .filter((element) => typeof element === "string");

    setNotSelected(checkNotSelected);

    if (checkNotSelected.length > 0) {
      dispatch(modalToggle(true));
      dispatch(backdropTypeToggle(false));
      dispatch(backdropVisibilityToggle(true));
    } else {
      dispatch(addProductToCart(product));
    }
  };

  const currentPrice = [...displayedProduct.prices].filter(
    (price) => price.currency.symbol === billingCurrency,
  );

  return (
    <section className={classes.section}>
      {createPortal(
        <Modal notSelected={notSelected} />,
        document.getElementById("modals-root"),
      )}
      {/* 1st column */}
      <div className={classes["thumbnails-wrapper"]}>
        {displayedProduct.gallery.map((imageURL) => (
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
        alt={displayedProduct.id}
      />
      {/* 3rd column */}
      <div className={classes["cart-actions"]}>
        <h1 className={classes["cart-actions__title"]}>
          <span className={classes.title__brand}>{displayedProduct.brand}</span>
          <span className={classes.title__name}>{displayedProduct.name}</span>
        </h1>

        <div className={classes["product-attributes"]}>
          {displayedProduct.attributes.map((attribute) => (
            <div key={attribute.name} className={classes["product-attribute"]}>
              <h3 className={classes["product-attribute__label"]}>
                {attribute.name}:
              </h3>
              <div
                attributeType={attribute.name}
                className={classes["product-attribute__values"]}
              >
                {attribute.items.map((attributeItem) => {
                  let content = (
                    <button
                      type="button"
                      key={attributeItem.displayValue}
                      className={classes["product-attribute__value"]}
                      onClick={onAttributeValueSelect}
                    >
                      {attributeItem.value}
                    </button>
                  );

                  if (attribute.name === "Color") {
                    content = (
                      <button
                        type="button"
                        key={attributeItem.displayValue}
                        className={classes["product-attribute__value--color"]}
                        style={{
                          backgroundColor:
                            attributeItem.value === "#FFFFFF"
                              ? "#F0F0F0"
                              : `${attributeItem.value}`,
                        }}
                        onClick={onAttributeValueSelect}
                      >
                        {attributeItem.value}
                      </button>
                    );
                  }

                  return content;
                })}
              </div>
            </div>
          ))}
          <div className={classes["product-price"]}>
            <h3 className={classes["product-price__label"]}>Price:</h3>
            <p className={classes["product-price__value"]}>
              {currentPrice[0].currency.symbol}
              {currentPrice[0].amount}
            </p>
          </div>
        </div>
        <Button
          isDisabled={!displayedProduct.inStock}
          clicked={onAddProductToCart}
          customClass={classes["cart-actions__button"]}
        >
          Add to cart
        </Button>
        <div className={classes.description}>
          <Markup content={displayedProduct.description} />
        </div>
      </div>
    </section>
  );
}

export default PDP;