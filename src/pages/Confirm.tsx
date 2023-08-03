import { useState, useEffect } from "react";

import ShoppingBagIcon from "../components/UI/ShoppingBagIcon";

function Confirm() {
  const [showCheckmark, setShowCheckmark] = useState(false);

  useEffect(() => {
    setTimeout(() => setShowCheckmark(true), 1000);
  }, []);

  return (
    <section>
      <h1>Thank you for your purchase !</h1>
      <ShoppingBagIcon animateCheckmark={showCheckmark} />
    </section>
  );
}

export default Confirm;
