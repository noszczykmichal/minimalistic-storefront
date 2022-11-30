import { Component, createRef } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { CSSTransition } from "react-transition-group";

import classes from "./MiniCart.module.css";
import MiniCartItems from "./MiniCartItems/MiniCartItems";
import Button from "../../UI/Button";

class MiniCart extends Component {
  constructor(props) {
    super(props);
    this.miniCartRef = createRef();
  }

  clickHandler = () => {
    const { history, backdropVisibilityToggle, miniCartVisibilityToggle } =
      this.props;
    backdropVisibilityToggle(false);
    miniCartVisibilityToggle(false);
    history.push({ pathname: "/cart" });
  };

  render() {
    const { productsTotal, totalPrice, billingCurrency, isMiniCartOpen } =
      this.props;
    return (
      <CSSTransition
        in={isMiniCartOpen}
        timeout={300}
        classNames={{
          enter: "",
          enterActive: classes["mini-cart--open"],
          exit: "",
          exitActive: classes["mini-cart--closed"],
        }}
        nodeRef={this.miniCartRef}
        mountOnEnter
        unmountOnExit
      >
        <div className={classes["mini-cart"]} ref={this.miniCartRef}>
          <h2 className={classes["mini-cart__title"]}>
            My Bag,{" "}
            <span className={classes["title__items-count"]}>
              {productsTotal}
            </span>{" "}
            <span className={classes["title__items-count"]}>
              {productsTotal === 1 ? "item" : "items"}
            </span>
          </h2>
          <MiniCartItems />
          <div className={classes["mini-cart__total-price"]}>
            <p className={classes["total-price__text"]}>Total</p>
            <p className={classes["total-price__price"]}>
              {billingCurrency}
              {totalPrice}
            </p>
          </div>
          <div className={classes["mini-cart__actions"]}>
            <Button
              customClass={[
                classes.actions__button,
                classes["actions__button--transparent"],
              ].join(" ")}
              clicked={this.clickHandler}
            >
              View Bag
            </Button>
            <Button
              customClass={[
                classes.actions__button,
                classes["actions__button--green"],
              ].join(" ")}
              clicked={this.clickHandler}
            >
              Check out
            </Button>
          </div>
        </div>
      </CSSTransition>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    productsTotal: state.products.productsTotal,
    totalPrice: state.products.totalPrice,
    billingCurrency: state.products.billingCurrency,
    isMiniCartOpen: state.ui.isMiniCartOpen,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    backdropVisibilityToggle: (isOpen) =>
      dispatch({ type: "ui/backdropVisibilityToggle", payload: isOpen }),
    miniCartVisibilityToggle: (isOpen) => {
      dispatch({ type: "ui/miniCartVisibilityToggle", payload: isOpen });
    },
  };
};

MiniCart.propTypes = {
  productsTotal: PropTypes.number.isRequired,
  totalPrice: PropTypes.number.isRequired,
  billingCurrency: PropTypes.string.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  backdropVisibilityToggle: PropTypes.func.isRequired,
  miniCartVisibilityToggle: PropTypes.func.isRequired,
  isMiniCartOpen: PropTypes.bool.isRequired,
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(MiniCart),
);
