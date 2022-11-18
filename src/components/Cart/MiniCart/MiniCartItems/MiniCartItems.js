import { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import MiniCartItem from "./MiniCartItem/MiniCartItem";
import classes from "./MiniCartItems.module.css";

class MiniCartItems extends Component {
  render() {
    const { cart } = this.props;
    return (
      <ul className={classes["cart-items"]}>
        {cart.map((cartItem) => (
          <MiniCartItem key={cartItem.id} itemDetails={cartItem} />
        ))}
      </ul>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    cart: state.cart.cart,
  };
};

MiniCartItems.propTypes = {
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
};

export default connect(mapStateToProps)(MiniCartItems);
