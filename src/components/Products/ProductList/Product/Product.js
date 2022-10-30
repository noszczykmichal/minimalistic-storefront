/* eslint-disable no-lone-blocks */
/* eslint-disable react/prop-types */
import { Component } from "react";

import classes from "./Product.module.css";

class Product extends Component {
  render() {
    const { productDetails } = this.props;
    return (
      <li className={classes["product-card"]}>
        <div
          style={{ backgroundImage: `url(${productDetails.gallery[0]})` }}
          alt={productDetails.id}
          className={classes["product-card__image"]}
        >
          {!productDetails.inStock ? (
            <div className={classes.image__overlay}>
              <p>OUT OF STOCK</p>
            </div>
          ) : null}
        </div>
        <div className={classes["product-details"]}>
          <p className={classes["product-details__name"]}>
            <span>{productDetails.brand} </span>
            <span>{productDetails.name}</span>
          </p>
          <p className={classes["product-details__price"]}>
            {productDetails.prices[0].currency.symbol}
            {productDetails.prices[0].amount}
          </p>
        </div>
      </li>
    );
  }
}

export default Product;
