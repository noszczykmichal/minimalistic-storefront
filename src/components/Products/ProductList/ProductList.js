/* eslint-disable react/prop-types */
import { Component } from "react";

import classes from "./ProductList.module.css";
import Product from "./Product/Product";

class ProductList extends Component {
  render() {
    const { products } = this.props;
    // console.log(products);
    return (
      <ul className={classes["product-list"]}>
        {products.map((product) => (
          <Product key={product.id} productDetails={product} />
        ))}
      </ul>
    );
  }
}

export default ProductList;
