import NavigationItems from "@/components/Navigation/NavigationItems/NavigationItems";
import Logo from "@/components/Navigation/Toolbar/Logo/Logo";
import CartIcon from "@/components/Navigation/Toolbar/CartIcon/CartIcon";
import CurrencySwitcher from "@/components/Navigation/Toolbar/CurrencySwitcher/CurrencySwitcher";

import MiniCart from "@/components/Cart/MiniCart/MiniCart";
import ToggleButton from "@/components/Navigation/MobileNavigation/ToggleButton/ToggleButton";
import { useAppSelector } from "@/hooks/useReduxHooks";
import classes from "@/components/Navigation/Toolbar/Toolbar.module.css";
import AccountIcon from "@/components/Navigation/Toolbar/AccountIcon/AccountIcon";

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
        <AccountIcon />
        <CartIcon />
        <MiniCart />
        <ToggleButton />
      </div>
    </header>
  );
}
