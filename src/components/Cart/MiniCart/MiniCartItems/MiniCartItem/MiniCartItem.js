import { Component } from "react";
import PropTypes from "prop-types";

import classes from "./MiniCartItem.module.css";

class MiniCartItem extends Component {
  render() {
    const { itemDetails } = this.props;
    return (
      <li className={classes["cart-item"]}>
        <div className={classes["cart-item__product-details"]}>
          <h3 className={classes["product-details__title"]}>
            <span className={classes.title__item}>{itemDetails.brand}</span>
            <span className={classes.title__item}>{itemDetails.name}</span>
          </h3>
          <p className={classes["product-details__price"]}>
            {itemDetails.prices[0].currency.symbol}
            {itemDetails.prices[0].amount}
          </p>
        </div>

        {/* <div className={classes["cart-item__product-attributes"]}>
          {itemDetails.attributes.map((attribute) => (
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
        </div> */}

        <div />
        <div />
      </li>
    );
  }
}

MiniCartItem.propTypes = {
  itemDetails: PropTypes.shape({
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
  }).isRequired,
};

export default MiniCartItem;
