import { useRef } from "react";
import { CSSTransition } from "react-transition-group";

import classes from "./MobileNavigation.module.css";
import NavigationItems from "../NavigationItems/NavigationItems";
import { useAppSelector } from "../../../hooks/reduxHooks";

function MobileNavigation() {
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

export default MobileNavigation;
