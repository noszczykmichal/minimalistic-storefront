/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Markup } from "interweave";

import classes from "./PDP.module.css";

class PDP extends Component {
  constructor(props) {
    super(props);
    const { displayedProduct } = this.props;

    this.state = {
      mainImageURL: displayedProduct.gallery[0],
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
    const attributeValues = event.target.parentElement;
    const attributeValuesType = attributeValues.getAttribute("attributeType");

    if (attributeValuesType !== "Color") {
      this.classNameToggler(
        "product-attribute__value--selected",
        attributeValues,
        event,
      );
    } else {
      this.classNameToggler(
        "product-attribute__value--color-selected",
        attributeValues,
        event,
      );
    }
  };

  render() {
    const { displayedProduct } = this.props;
    const { mainImageURL } = this.state;

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
                {displayedProduct.prices[0].currency.symbol}
                {displayedProduct.prices[0].amount}
              </p>
            </div>
          </div>
          <button
            type="button"
            className={classes["button--add-to-cart"]}
            disabled={!displayedProduct.inStock}
          >
            Add to cart
          </button>
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
  }).isRequired,
};

export default connect(mapStateToProps)(PDP);
