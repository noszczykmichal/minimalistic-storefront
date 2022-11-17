import { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import classes from "./Minicart.module.css";
import MiniCartItems from "./MiniCartItems/MiniCartItems";

class MiniCart extends Component {
  render() {
    const { productsTotal } = this.props;
    return (
      <div className={classes["mini-cart"]}>
        <h2 className={classes["mini-cart__title"]}>
          My Bag,{" "}
          <span className={classes["title__items-count"]}>{productsTotal}</span>{" "}
          <span className={classes["title__items-count"]}>
            {productsTotal === 1 ? "item" : "items"}
          </span>
        </h2>
        <MiniCartItems />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    productsTotal: state.cart.productsTotal,
  };
};

MiniCart.propTypes = {
  productsTotal: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(MiniCart);
