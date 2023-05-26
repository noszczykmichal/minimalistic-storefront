import classes from "./ProductList.module.css";
import Product from "./Product/Product";
import { ProductType } from "../../../models/productSlice.models";

function ProductList({ products }: { products: ProductType[] }) {
  return (
    <ul className={classes["product-list"]}>
      {products.map((product) => (
        <Product key={product.id} productDetails={product} />
      ))}
    </ul>
  );
}

export default ProductList;
