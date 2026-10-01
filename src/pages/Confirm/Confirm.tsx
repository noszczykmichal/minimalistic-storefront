import { useState, useEffect } from "react";
import { Link } from "react-router";

import ShoppingBagIcon from "@/components/UI/ShoppingBagIcon/ShoppingBagIcon";
import { useAppDispatch } from "@/hooks/useReduxHooks";
import { productActions } from "@/store/productsSlice";
import { shippingAndPaymentActions } from "@/store/shippingAddressAndPayment";
import classes from "@/pages/Confirm/Confirm.module.css";

export default function Confirm() {
  const [showCheckmark, setShowCheckmark] = useState(false);
  const dispatch = useAppDispatch();
  const { clearCart } = productActions;
  const { clearShippingAndPaymentData } = shippingAndPaymentActions;

  useEffect(() => {
    dispatch(clearCart());

    dispatch(clearShippingAndPaymentData());
    setTimeout(() => setShowCheckmark(true), 500);
  }, [dispatch, clearCart, clearShippingAndPaymentData]);

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
