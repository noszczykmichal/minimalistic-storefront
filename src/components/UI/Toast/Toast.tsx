import { useRef } from "react";
import { createPortal } from "react-dom";
import { CSSTransition } from "react-transition-group";

import CheckMarkIcon from "@/components/UI/Icons/CheckMarkIcon/CheckMarkIcon";
import { useAppSelector } from "@/hooks/useReduxHooks";
import classes from "@/components/UI/Toast/Toast.module.css";

export default function Toast() {
  const { isToastOpen } = useAppSelector((state) => state.ui);

  const toastRef = useRef<HTMLDivElement>(null);
  return createPortal(
    <CSSTransition
      in={isToastOpen}
      nodeRef={toastRef}
      timeout={500}
      classNames={{
        enter: "",
        enterActive: classes["toast--open"],
        exit: "",
        exitActive: classes["toast--closed"],
      }}
      mountOnEnter
      unmountOnExit
    >
      <div className={classes.toast} ref={toastRef}>
        <CheckMarkIcon className={classes["icon--success"]} />
        <p className={classes.toast__message}>Account has been created</p>
      </div>
    </CSSTransition>,
    document.getElementById("modals-root") as HTMLDivElement,
  );
}
