import Product from "@/components/Products/ProductList/Product/Product";
import { ProductType } from "@/models/productSlice.models";
import classes from "@/components/Products/ProductList/ProductList.module.css";

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
