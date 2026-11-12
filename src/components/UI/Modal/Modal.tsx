import { ReactNode, useRef } from "react";
import { createPortal } from "react-dom";
import { CSSTransition } from "react-transition-group";
import clsx from "clsx";

import Backdrop from "@/components/UI/Backdrop/Backdrop";
import classes from "@/components/UI/Modal/Modal.module.css";

export default function Modal({
  children,
  isOpen,
  header = "Error",
  className,
  onClose = () => {},
}: {
  children: ReactNode;
  header?: string;
  className?: string;
  isOpen: boolean;
  onClose?: () => void;
}) {
  const modalRef = useRef<HTMLDivElement>(null);

  return createPortal(
    <>
      <CSSTransition
        nodeRef={modalRef}
        in={isOpen}
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
        <div className={clsx(classes.modal)} ref={modalRef}>
          <h5 className={clsx(classes.modal__header, className)}>{header}</h5>
          <div className={classes.modal__body}>{children}</div>
        </div>
      </CSSTransition>
      <Backdrop isBackdropOpen={isOpen} onClose={onClose} />
    </>,
    document.getElementById("modals-root") as HTMLDivElement,
  );
}
