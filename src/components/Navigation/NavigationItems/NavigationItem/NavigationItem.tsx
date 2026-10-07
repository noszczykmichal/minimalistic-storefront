import { NavLink } from "react-router";
import { ReactNode } from "react";

import { uiActions } from "@/store/uiSlice";
import { useAppDispatch } from "@/hooks/useReduxHooks";
import classes from "@/components/Navigation/NavigationItems/NavigationItem/NavigationItem.module.css";

export default function NavigationItem({
  link,
  children,
}: {
  link: string;
  children: ReactNode;
}) {
  const dispatch = useAppDispatch();
  const {
    currencySwitcherVisibToggle,
    miniCartVisibilityToggle,
    mobileNavVisibilityToggle,
  } = uiActions;

  const onNavLinkClickHandler = () => {
    dispatch(currencySwitcherVisibToggle(false));
    dispatch(miniCartVisibilityToggle(false));
    dispatch(mobileNavVisibilityToggle(false));
  };

  return (
    <li className={classes["navigation-item"]}>
      <NavLink to={link} onClick={onNavLinkClickHandler}>
        {children}
      </NavLink>
    </li>
  );
}
