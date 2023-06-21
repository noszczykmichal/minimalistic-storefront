import classes from "./Shipping.module.css";
import { useAppSelector } from "../hooks/reduxHooks";

function Shipping() {
  const { cart, billingCurrency } = useAppSelector((state) => state.products);

  return (
    <section className={classes.section}>
      <div className={classes["shipping-form__wrapper"]}>
        <h1>Shipping</h1>
        <p>Type in the shipping address</p>
        <form className={classes.form}>
          <div className={classes["form-control"]}>
            <label htmlFor="fName">
              First Name:
              <input type="text" name="fName" />
            </label>
          </div>
          <div className={classes["form-control"]}>
            <label htmlFor="lName">
              Last Name:
              <input type="text" name="lName" />
            </label>
          </div>
          <div className={classes["form-control"]}>
            <label htmlFor="address_1">
              Address Line 1:
              <input type="text" name="address_1" />
            </label>
          </div>
          <div className={classes["form-control"]}>
            <label htmlFor="address_2">
              Address Line 2:
              <input type="text" name="address_2" />
            </label>
          </div>
          <div className={classes["form-control"]}>
            <label htmlFor="city">
              City:
              <input type="text" name="city" />
            </label>
          </div>
          <div className={classes["form-control"]}>
            <label htmlFor="postal_code">
              Postal Code:
              <input type="text" name="postal_code" />
            </label>
          </div>
          <div className={classes["form-control"]}>
            <label htmlFor="country">
              Country:
              <input type="text" name="country" />
            </label>
          </div>
          <div className={classes["form-control"]}>
            <label htmlFor="phone">
              Phone:
              <input type="tel" name="phone" />
            </label>
          </div>
          <div className={classes["form-control"]}>
            <label htmlFor="email">
              E-mail:
              <input type="email" name="email" />
            </label>
          </div>
        </form>
      </div>

      <div className={classes["order-summary"]}>
        <p>Order Summary</p>
        <ul className={classes["cart-items"]}>
          {cart.map((cartItem) => {
            return (
              <li key={cartItem.internalID} className={classes["cart-item"]}>
                {/* first column */}
                <div className={classes["cart-item__image-wrapper"]}>
                  <p className={classes["cart-item__product-quantity"]}>
                    {cartItem.quantity} x
                  </p>
                  <div
                    className={classes["cart-item__thumbnail"]}
                    style={{ backgroundImage: `url(${cartItem.gallery[0]})` }}
                  />
                </div>
                {/* second column */}
                <div className={classes["cart-item__description"]}>
                  <p>
                    {cartItem.brand} {cartItem.name}
                    {cartItem.attributes.map((attribute) => (
                      <span
                        key={attribute.name}
                        className={classes["cart-item__attribute"]}
                      >
                        {" "}
                        {attribute.name}{" "}
                        {attribute.items.map((attributeItem) =>
                          attributeItem.selected
                            ? ` ${attributeItem.displayValue}`
                            : null,
                        )}
                      </span>
                    ))}
                  </p>
                </div>
                <p className={classes["cart-item__price-tag"]}>
                  {billingCurrency}
                  {cartItem.prices.map((price) =>
                    price.currency.symbol === billingCurrency
                      ? price.amount.toFixed(2)
                      : null,
                  )}
                </p>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

export default Shipping;
