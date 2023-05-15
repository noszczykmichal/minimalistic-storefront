import PropTypes from "prop-types";

import classes from "./ProductList.module.css";
import Product from "./Product/Product";

function ProductList({ products }) {
  return (
    <ul className={classes["product-list"]}>
      {products.map((product) => (
        <Product key={product.id} productDetails={product} />
      ))}
    </ul>
  );
}

ProductList.propTypes = {
  products: PropTypes.arrayOf(
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
    }),
  ).isRequired,
};

export default ProductList;
