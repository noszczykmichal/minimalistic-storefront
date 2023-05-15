/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { CSSTransition } from "react-transition-group";

import classes from "./Backdrop.module.css";
import { uiActions } from "../../store/uiSlice";

function Backdrop() {
  const backdropRef = useRef();
  const dispatch = useDispatch();
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

  const { isBackdropTransparent, isBackdropOpen } = useSelector(
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
