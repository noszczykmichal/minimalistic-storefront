import { Link, useLocation } from "react-router";

import { productActions } from "@/store/products/products";
import { useAppSelector, useAppDispatch } from "@/hooks/useReduxHooks";
import { ProductType } from "@/types/types";
import ShoppingCartIcon from "@/components/UI/Icons/ShoppingCartIcon/ShoppingCartIcon";
import classes from "@/components/Products/ProductList/Product/Product.module.css";

export default function Product({
  productDetails,
}: {
  productDetails: ProductType;
}) {
  const billingCurrency = useAppSelector(
    (state) => state.products.billingCurrency,
  );
  const { onCurrentPDPChange, addProductToCart } = productActions;
  const dispatch = useAppDispatch();
  const location = useLocation();
  const productName = `${productDetails.brand} ${productDetails.name}`;

  const currentPath = location.pathname;
  const productPath =
    currentPath === "/"
      ? `${currentPath}all/${productDetails.id}`
      : `${currentPath}/${productDetails.id}`;

  const onProductClick = () => {
    dispatch(onCurrentPDPChange(productDetails));
  };

  const addProductWithDefaults = () => {
    const updatedAttributes = productDetails.attributes.map((attribute) => {
      const extensibleAttribItem = JSON.parse(
        JSON.stringify(attribute.items[0]),
      );
      extensibleAttribItem.selected = true;
      const updatedItems = [...attribute.items];
      updatedItems.shift();
      updatedItems.unshift(extensibleAttribItem);

      return { ...attribute, items: updatedItems };
    });

    const updatedProduct = {
      ...productDetails,
      attributes: updatedAttributes,
    };
    dispatch(addProductToCart(updatedProduct));
  };

  const currentPrice = [...productDetails.prices].filter(
    (price) => price.currency.symbol === billingCurrency,
  );
  const addToCartButton = (
    <button
      type="button"
      className={classes["product-card__button--add-to-cart"]}
      onClick={addProductWithDefaults}
      aria-label={`Add ${productName} to cart`}
    >
      <ShoppingCartIcon size={24} />
    </button>
  );

  return (
    <li className={classes["product-card"]}>
      <div className={classes["product-card__image"]}>
        <img src={productDetails.gallery[0]} alt={productDetails.name} />
        {!productDetails.inStock ? (
          <div className={classes.image__overlay}>
            <p>OUT OF STOCK</p>
          </div>
        ) : null}
        <Link
          to={productPath}
          onClick={onProductClick}
          aria-label={productName}
          className={classes["image__product-link"]}
        />
        {productDetails.inStock ? addToCartButton : null}
      </div>

      <div className={classes["product-details"]}>
        <p className={classes["product-details__name"]}>
          <span>{productDetails.brand} </span>
          <span>{productDetails.name}</span>
        </p>
        <p className={classes["product-details__price"]}>
          {currentPrice[0].currency.symbol}
          {currentPrice[0].amount.toFixed(2)}
        </p>
      </div>
    </li>
  );
}
