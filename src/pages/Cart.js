import { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import CartPageItem from "../components/Cart/CartPageItem/CartPageItem";
import classes from "./Cart.module.css";
import Hr from "../components/UI/Hr";
import Button from "../components/UI/Button";

class Cart extends Component {
  render() {
    const { cart, billingCurrency, productsTotal, totalPrice } = this.props;
    return (
      <section>
        <h1 className={classes.title}>Cart</h1>
        <ul className={classes["items-list"]}>
          {cart.map((cartItem) => (
            <CartPageItem key={cartItem.internalID} itemDetails={cartItem} />
          ))}
        </ul>
        <Hr />
        <div className={classes.summery}>
          <div className={classes["summery-wrapper__labels"]}>
            <p className={classes["summery-wrapper__label"]}>Tax 21%: </p>
            <p className={classes["summery-wrapper__label"]}>Quantity: </p>
            <p
              className={[
                classes["summery-wrapper__label"],
                classes["summery-wrapper__label--bold"],
              ].join(" ")}
            >
              Total:
            </p>
          </div>
          <div className={classes["summery-wrapper__values"]}>
            <p className={classes.values__item}>
              {billingCurrency}
              {(totalPrice * 0.21).toFixed(2)}
            </p>
            <p className={classes.values__item}>{productsTotal}</p>
            <p className={classes.values__item}>
              {billingCurrency}
              {totalPrice.toFixed(2)}
            </p>
          </div>
        </div>
        <Button customClass={classes.summery__button}>Order</Button>
      </section>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    cart: state.products.cart,
    billingCurrency: state.products.billingCurrency,
    productsTotal: state.products.productsTotal,
    totalPrice: state.products.totalPrice,
  };
};

Cart.propTypes = {
  cart: PropTypes.arrayOf(
    PropTypes.shape({
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
  ).isRequired,
  billingCurrency: PropTypes.string.isRequired,
  productsTotal: PropTypes.number.isRequired,
  totalPrice: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(Cart);
