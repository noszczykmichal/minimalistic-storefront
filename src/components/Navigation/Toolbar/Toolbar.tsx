import { createPortal } from "react-dom";

import NavigationItems from "@/components/Navigation/NavigationItems/NavigationItems";
import Logo from "@/components/Navigation/Toolbar/Logo/Logo";
import CartIcon from "@/components/Navigation/Toolbar/CartIcon/CartIcon";
import CurrencySwitcher from "@/components/Navigation/Toolbar/CurrencySwitcher/CurrencySwitcher";
import Backdrop from "@/components/UI/Backdrop/Backdrop";
import MiniCart from "@/components/Cart/MiniCart/MiniCart";
import ToggleButton from "@/components/Navigation/MobileNavigation/ToggleButton/ToggleButton";
import { useAppSelector } from "@/hooks/useReduxHooks";
import classes from "@/components/Navigation/Toolbar/Toolbar.module.css";

export default function Toolbar() {
  const { categories, currencies } = useAppSelector((state) => state.ui);

  let navigationItems;
  let currencySwitcher;

  if (categories.length) {
    navigationItems = <NavigationItems categories={categories} />;
  }
  if (currencies.length) {
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

      {createPortal(
        <Backdrop />,
        document.getElementById("modals-root") as HTMLDivElement,
      )}
    </header>
  );
}
