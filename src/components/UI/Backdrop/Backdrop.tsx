/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useRef } from "react";
import { CSSTransition } from "react-transition-group";

import classes from "./Backdrop.module.css";
import { uiActions } from "../../../store/uiSlice";
import { useAppSelector, useAppDispatch } from "../../../hooks/useReduxHooks";

function Backdrop() {
  const backdropRef = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();
  const {
    currencySwitcherVisibToggle,
    backdropVisibilityToggle,
    miniCartVisibilityToggle,
    modalToggle,
    mobileNavVisibilityToggle,
  } = uiActions;

  const onBackdropClick = () => {
    dispatch(currencySwitcherVisibToggle(false));
    dispatch(backdropVisibilityToggle(false));
    dispatch(miniCartVisibilityToggle(false));
    dispatch(modalToggle(false));
    dispatch(mobileNavVisibilityToggle(false));
  };

  const { isBackdropTransparent, isBackdropOpen } = useAppSelector(
    (state) => state.ui,
  );

  return (
    <CSSTransition
      in={isBackdropOpen}
      timeout={500}
      nodeRef={backdropRef}
      classNames={{
        enter: "",
        enterActive: classes["backdrop--open"],
        exit: "",
        exitActive: classes["backdrop--closed"],
      }}
      mountOnEnter
      unmountOnExit
    >
      <div
        className={
          isBackdropTransparent
            ? classes.backdrop
            : [classes.backdrop, classes["backdrop--grey"]].join(" ")
        }
        onClick={onBackdropClick}
        ref={backdropRef}
      />
    </CSSTransition>
  );
}

export default Backdrop;
