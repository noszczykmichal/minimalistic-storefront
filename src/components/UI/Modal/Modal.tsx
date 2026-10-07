import { ReactNode, useRef } from "react";
import { createPortal } from "react-dom";
import { CSSTransition } from "react-transition-group";
import clsx from "clsx";

import { uiActions } from "@/store/uiSlice";
import { useAppSelector, useAppDispatch } from "@/hooks/useReduxHooks";
import Backdrop from "@/components/UI/Backdrop/Backdrop";
import classes from "@/components/UI/Modal/Modal.module.css";

export default function Modal({
  children,
  header,
  className,
}: {
  children: ReactNode;
  header: string;
  className?: string;
}) {
  const modalRef = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();
  const { isModalOpen } = useAppSelector((state) => state.ui);
  const { modalToggle } = uiActions;

  const modalHandler = () => {
    dispatch(modalToggle(false));
  };

  return createPortal(
    <>
      <CSSTransition
        nodeRef={modalRef}
        in={isModalOpen}
        timeout={500}
        classNames={{
          enter: "",
          enterActive: classes["modal--open"],
          exit: "",
          exitActive: classes["modal--closed"],
        }}
        mountOnEnter
        unmountOnExit
      >
        <div className={clsx(classes.modal, className)} ref={modalRef}>
          <h5 className={classes.modal__header}>{header}</h5>
          {children}
        </div>
      </CSSTransition>
      <Backdrop isBackdropOpen={isModalOpen} onClose={modalHandler} />
    </>,
    document.getElementById("modals-root") as HTMLDivElement,
  );
}
