import { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import classes from "./MiniCartItem.module.css";

class MiniCartItem extends Component {
  render() {
    const { itemDetails, increaseQuantity, decreaseQuantity } = this.props;
    return (
      <li className={classes["cart-item"]}>
        <div className={classes["column-wrapper--big"]}>
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

          <div className={classes["cart-item__product-attributes"]}>
            {itemDetails.attributes.map((attribute) => (
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
          <button
            type="button"
            className={classes["cart-actions__button"]}
            onClick={() => increaseQuantity(itemDetails.internalID)}
          >
            +
          </button>
          <p className={classes["cart-actions__quantity"]}>
            {itemDetails.quantity}
          </p>
          <button
            type="button"
            className={classes["cart-actions__button"]}
            onClick={() => decreaseQuantity(itemDetails.internalID)}
          >
            -
          </button>
        </div>
        <div
          className={classes["image-container"]}
          style={{ backgroundImage: `url(${itemDetails.gallery[0]})` }}
        />
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
    quantity: PropTypes.number.isRequired,
    internalID: PropTypes.string.isRequired,
  }).isRequired,
};

const mapDispatchToProps = (dispatch) => {
  return {
    increaseQuantity: (internalID) =>
      dispatch({ type: "cart/increaseQuantity", payload: internalID }),
    decreaseQuantity: (internalID) =>
      dispatch({ type: "cart/decreaseQuantity", payload: internalID }),
  };
};
MiniCartItem.propTypes = {
  increaseQuantity: PropTypes.func.isRequired,
  decreaseQuantity: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(MiniCartItem);
