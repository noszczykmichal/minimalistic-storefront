import { useRef } from "react";
import { CSSTransition } from "react-transition-group";

import NavigationItems from "@/components/Navigation/NavigationItems/NavigationItems";
import { useAppSelector } from "@/hooks/useReduxHooks";
import classes from "@/components/Navigation/MobileNavigation/MobileNavigation.module.css";

export default function MobileNavigation() {
  const { categories, isMobileNavOpen } = useAppSelector((state) => state.ui);
  const nodeRef = useRef<HTMLElement>(null);

  return (
    <CSSTransition
      nodeRef={nodeRef}
      in={isMobileNavOpen}
      timeout={500}
      classNames={{
        enter: "",
        enterActive: classes["mobile-navigation--open"],
        exit: "",
        exitActive: classes["mobile-navigation--closed"],
      }}
      mountOnEnter
      unmountOnExit
    >
      <nav className={classes["mobile-navigation"]} ref={nodeRef}>
        <NavigationItems categories={categories} />
      </nav>
    </CSSTransition>
  );
}
