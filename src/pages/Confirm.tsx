import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import ShoppingBagIcon from "../components/UI/ShoppingBagIcon";
import { useAppDispatch } from "../hooks/useReduxHooks";
import { productActions } from "../store/productsSlice";
import { shippingAddressActions } from "../store/shippingAddress";
import { shippingPaymentOptionsActions } from "../store/shippingPaymentOptions";
import classes from "./Confirm.module.css";

function Confirm() {
  const [showCheckmark, setShowCheckmark] = useState(false);
  const dispatch = useAppDispatch();
  const { clearCart } = productActions;
  const { clearShippingAddress } = shippingAddressActions;
  const { clearShippingPaymentOptions } = shippingPaymentOptionsActions;

  useEffect(() => {
    dispatch(clearCart());
    dispatch(clearShippingAddress());
    dispatch(clearShippingPaymentOptions());
    setTimeout(() => setShowCheckmark(true), 500);
  }, [dispatch, clearCart, clearShippingAddress, clearShippingPaymentOptions]);

  return (
    <section className={classes.section}>
      <div className={classes["icon-wrapper"]}>
        <ShoppingBagIcon animateCheckmark={showCheckmark} />
      </div>
      <div className={classes["heading-wrapper"]}>
        <h1 className={classes.heading}>Thank you for your purchase !</h1>
        <Link to="/" className={classes.link}>
          Ready for More Shopping?
        </Link>
      </div>
    </section>
  );
}

export default Confirm;
