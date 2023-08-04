import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import ShoppingBagIcon from "../components/UI/ShoppingBagIcon";
import classes from "./Confirm.module.css";

function Confirm() {
  const [showCheckmark, setShowCheckmark] = useState(false);

  useEffect(() => {
    setTimeout(() => setShowCheckmark(true), 500);
  }, []);

  return (
    <section className={classes.section}>
      <div className={classes.wrapperIcon}>
        <ShoppingBagIcon animateCheckmark={showCheckmark} />
      </div>
      <div className={classes.wrapperHeading}>
        <h1 className={classes.heading}>Thank you for your purchase !</h1>
        <Link to="/" className={classes.link}>
          Ready for More Shopping?
        </Link>
      </div>
    </section>
  );
}

export default Confirm;
