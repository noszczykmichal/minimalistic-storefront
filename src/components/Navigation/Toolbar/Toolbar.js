import { useSelector } from "react-redux";
import { createPortal } from "react-dom";

import NavigationItems from "../NavigationItems/NavigationItems";
import classes from "./Toolbar.module.css";
import Logo from "./Logo/Logo";
import CartIcon from "./CartIcon/CartIcon";
import CurrencySwitcher from "./CurrencySwitcher/CurrencySwitcher";
import Backdrop from "../../UI/Backdrop";
import MiniCart from "../../Cart/MiniCart/MiniCart";
import ToggleButton from "../MobileNavigation/ToggleButton/ToggleButton";

function Toolbar() {
  const categories = useSelector((state) => state.ui.categories);
  const currencies = useSelector((state) => state.ui.currencies);

  let navigationItems;
  let currencySwitcher;

  if (categories) {
    navigationItems = <NavigationItems categories={categories} />;
  }
  if (currencies) {
    currencySwitcher = <CurrencySwitcher currencies={currencies} />;
  }

  return (
    <header className={classes.toolbar}>
      <nav className={classes["toolbar__desktop-nav"]}>{navigationItems}</nav>
      <Logo />
      <div className={classes["cart-actions"]}>
        {currencySwitcher}
        <CartIcon />
        <MiniCart />
        <ToggleButton />
      </div>

      {createPortal(<Backdrop />, document.getElementById("modals-root"))}
    </header>
  );
}

export default Toolbar;
