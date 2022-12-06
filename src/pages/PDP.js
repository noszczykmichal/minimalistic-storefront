/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { Component } from "react";
import { connect } from "react-redux";
import { createPortal } from "react-dom";
import PropTypes from "prop-types";
import { Markup } from "interweave";

import classes from "./PDP.module.css";
import Button from "../components/UI/Button";
import Modal from "../components/UI/Modal";

class PDP extends Component {
  constructor(props) {
    super(props);
    const {
      displayedProduct,
      addProductToCart,
      backdropVisibilityToggle,
      backdropTypeToggle,
      modalToggle,
    } = this.props;
    this.addProductToCart = addProductToCart;
    this.backdropVisibilityToggle = backdropVisibilityToggle;
    this.backdropTypeToggle = backdropTypeToggle;
    this.modalToggle = modalToggle;

    this.state = {
      mainImageURL: displayedProduct.gallery[0],
      product: displayedProduct,
      notSelected: [],
    };
  }

  imageToggle = (imageURL) => {
    this.setState({ mainImageURL: imageURL });
  };

  classNameToggler = (className, parentElement, event) => {
    this.childrenOfParent = [...parentElement.children];

    this.childrenOfParent.forEach((element) =>
      element.classList.remove(classes[`${className}`]),
    );

    this.childrenOfParent.forEach((element) =>
      element === event.target
        ? element.classList.add(classes[`${className}`])
        : null,
    );
  };

  onAttributeValueSelect = (event) => {
    const parentEl = event.target.parentElement;
    const searchedAttributeType = parentEl.getAttribute("attributeType");
    const { product } = this.state;
    const productAttributes = product.attributes;
    const searchedAttribItem = event.target.innerText;

    if (searchedAttributeType !== "Color") {
      this.classNameToggler(
        "product-attribute__value--selected",
        parentEl,
        event,
      );
    } else {
      this.classNameToggler(
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

    this.setState((prevState) => ({
      product: { ...prevState.product, attributes: updatedProductAttributes },
    }));
  };

  onAddProductToCart = () => {
    const { product } = this.state;

    const checkNotSelected = product.attributes
      .map((attribute) => {
        const attributeItems = attribute.items;
        const isSelected = attributeItems.some((item) => item.selected);

        return !isSelected && attribute.name;
      })
      .filter((element) => typeof element === "string");

    this.setState({ notSelected: checkNotSelected });

    if (checkNotSelected.length > 0) {
      this.modalToggle(true);
      this.backdropTypeToggle(false);
      this.backdropVisibilityToggle(true);
    } else {
      this.addProductToCart(product);
    }
  };

  render() {
    const { displayedProduct, billingCurrency } = this.props;
    const { mainImageURL, notSelected } = this.state;

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
              onClick={() => this.imageToggle(imageURL)}
            />
          ))}
        </div>
        {/* 2nd column */}
        <img
          className={classes["main-image"]}
          src={mainImageURL}
          alt={displayedProduct.id}
        />
        {/* 3rd column */}
        <div className={classes["cart-actions"]}>
          <h1 className={classes["cart-actions__title"]}>
            <span className={classes.title__brand}>
              {displayedProduct.brand}
            </span>
            <span className={classes.title__name}>{displayedProduct.name}</span>
          </h1>

          <div className={classes["product-attributes"]}>
            {displayedProduct.attributes.map((attribute) => (
              <div
                key={attribute.name}
                className={classes["product-attribute"]}
              >
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
                        onClick={this.onAttributeValueSelect}
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
                          onClick={this.onAttributeValueSelect}
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
            clicked={this.onAddProductToCart}
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
}

const mapStateToProps = (state) => {
  return {
    displayedProduct: state.products.currentPDP,
    billingCurrency: state.products.billingCurrency,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addProductToCart: (product) =>
      dispatch({ type: "products/addProductToCart", payload: product }),
    backdropVisibilityToggle: (isOpen) =>
      dispatch({ type: "ui/backdropVisibilityToggle", payload: isOpen }),
    backdropTypeToggle: (isBackdropTransparent) =>
      dispatch({
        type: "ui/backdropTypeToggle",
        payload: isBackdropTransparent,
      }),
    modalToggle: (isOpen) =>
      dispatch({ type: "ui/modalToggle", payload: isOpen }),
  };
};

PDP.propTypes = {
  displayedProduct: PropTypes.shape({
    brand: PropTypes.string.isRequired,
    gallery: PropTypes.arrayOf(PropTypes.string).isRequired,
    id: PropTypes.string.isRequired,
    inStock: PropTypes.bool.isRequired,
    name: PropTypes.string.isRequired,
    prices: PropTypes.arrayOf(
      PropTypes.shape({
        amount: PropTypes.number.isRequired,
        currency: PropTypes.shape({
          symbol: PropTypes.string.isRequired,
        }),
      }),
    ).isRequired,
    attributes: PropTypes.arrayOf(
      PropTypes.shape({
        items: PropTypes.arrayOf(
          PropTypes.shape({
            displayValue: PropTypes.string.isRequired,
            value: PropTypes.string.isRequired,
          }),
        ),
      }),
    ).isRequired,
    description: PropTypes.string.isRequired,
  }).isRequired,
  billingCurrency: PropTypes.string.isRequired,
  addProductToCart: PropTypes.func.isRequired,
  backdropVisibilityToggle: PropTypes.func.isRequired,
  backdropTypeToggle: PropTypes.func.isRequired,
  modalToggle: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(PDP);
