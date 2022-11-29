import { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import classes from "./CartPageItem.module.css";
import Hr from "../../UI/Hr";
import Arrow from "../../UI/Arrow";

class CartPageItem extends Component {
  constructor(props) {
    super(props);
    const { itemDetails } = this.props;
    const { gallery } = itemDetails;
    // const { currentIndex } = this.state;
    this.state = {
      currentIndex: 0,
      currentThumbnail: gallery[0],
    };
  }

  scrollingArrowsHandler = (event) => {
    const { itemDetails } = this.props;
    const { gallery } = itemDetails;
    const regex = /right/;
    const attachedClass = [...event.target.classList].join(" ");
    const isRightArrow = regex.test(attachedClass);
    if (isRightArrow) {
      this.setState((prevState) => {
        const updatedIndex =
          prevState.currentIndex === gallery.length - 1
            ? 0
            : prevState.currentIndex + 1;
        return {
          currentIndex: updatedIndex,
          currentThumbnail: gallery[updatedIndex],
        };
      });
    } else {
      this.setState((prevState) => {
        const updatedIndex =
          prevState.currentIndex === 0
            ? gallery.length - 1
            : prevState.currentIndex - 1;
        return {
          currentIndex: updatedIndex,
          currentThumbnail: gallery[updatedIndex],
        };
      });
    }
  };

  render() {
    const { currentThumbnail } = this.state;
    const { itemDetails, changeQuantity } = this.props;
    const { gallery } = itemDetails;

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
                  {itemDetails.brand}
                </span>
                <span
                  className={[classes.title__name, classes.title__item].join(
                    " ",
                  )}
                >
                  {itemDetails.name}
                </span>
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
                              classes[
                                "product-attribute__value--color-selected"
                              ],
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
                onClick={() =>
                  changeQuantity(itemDetails.internalID, "addition")
                }
              >
                +
              </button>
              <p className={classes["cart-actions__quantity"]}>
                {itemDetails.quantity}
              </p>
              <button
                type="button"
                className={classes["cart-actions__button"]}
                onClick={() =>
                  changeQuantity(itemDetails.internalID, "subtraction")
                }
              >
                -
              </button>
            </div>
            <div className={classes["image-container"]}>
              <div
                className={classes["image-container__image"]}
                style={{ backgroundImage: `url(${currentThumbnail})` }}
              />
              {gallery.length > 1 ? (
                <div className={classes["image-container__scrolling-arrows"]}>
                  <Arrow variant="left" clicked={this.scrollingArrowsHandler} />
                  <Arrow
                    variant="right"
                    clicked={this.scrollingArrowsHandler}
                  />
                </div>
              ) : null}
            </div>
          </div>
        </li>
      </>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    changeQuantity: (internalID, operationType) =>
      dispatch({
        type: "products/changeQuantity",
        payload: { internalID, operationType },
      }),
  };
};

CartPageItem.propTypes = {
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
  changeQuantity: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(CartPageItem);
