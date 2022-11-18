/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Markup } from "interweave";

import classes from "./PDP.module.css";
import Button from "../components/UI/Button";

class PDP extends Component {
  constructor(props) {
    super(props);
    const { displayedProduct, addProductToCart } = this.props;
    this.addProductToCart = addProductToCart;

    this.state = {
      mainImageURL: displayedProduct.gallery[0],
      product: displayedProduct,
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
    const attributeType = parentEl.getAttribute("attributeType");
    const { product } = this.state;
    const productAttributes = product.attributes;
    const searchedAttribItem = event.target.innerText;

    if (attributeType !== "Color") {
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
      if (attribute.name === attributeType) {
        const attributeItems = JSON.parse(JSON.stringify(attribute.items));
        const clearedOfSelected = attributeItems.map((item) => {
          const updatedItem = { ...item };
          if (item.selected) {
            delete updatedItem.selected;
          }
          return updatedItem;
        });
        const filteredItem = clearedOfSelected.filter(
          (item) => item.displayValue === searchedAttribItem,
        );
        filteredItem[0].selected = true;
        const withoutFilteredItem = clearedOfSelected.filter(
          (item) => item.displayValue !== searchedAttribItem,
        );
        updatedItems = withoutFilteredItem.concat(filteredItem);
      }

      return { ...attribute, items: updatedItems };
    });

    this.setState((prevState) => ({
      product: { ...prevState.product, attributes: updatedProductAttributes },
    }));
  };

  onAddProductToCart = () => {
    const { product } = this.state;
    this.addProductToCart(product);
  };

  render() {
    const { displayedProduct, billingCurrency } = this.props;
    const { mainImageURL } = this.state;

    const currentPrice = [...displayedProduct.prices].filter(
      (price) => price.currency.symbol === billingCurrency,
    );

    return (
      <section className={classes.section}>
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
                          {attributeItem.displayValue}
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
      dispatch({ type: "cart/addProductToCart", payload: product }),
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
};

export default connect(mapStateToProps, mapDispatchToProps)(PDP);
