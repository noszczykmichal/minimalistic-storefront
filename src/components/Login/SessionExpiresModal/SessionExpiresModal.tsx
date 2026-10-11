import { useRef } from "react";
import { createPortal } from "react-dom";
import { CSSTransition } from "react-transition-group";

import { useAppSelector } from "@/hooks/useReduxHooks";

import Backdrop from "@/components/UI/Backdrop/Backdrop";
import classes from "@/components/Login/SessionExpiresModal/SessionExpiresModal.module.css";
import SessionExpiresContent from "@/components/Login/SessionExpiresModal/SessionExpiresContent/SessionExpiresContent";

export default function SessionExpiresModal() {
  const modalRef = useRef<HTMLDivElement>(null);
  const isOpen =
    useAppSelector((state) => state.auth.isAccessTokenExpiring) ?? false;
  const expiresAt = useAppSelector((state) => state.auth.accessTokenExpiresAt);

  return createPortal(
    <>
      <CSSTransition
        nodeRef={modalRef}
        in={isOpen ?? false}
        // in={false}
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
        <div className={classes.modal} ref={modalRef}>
          <SessionExpiresContent expiresAt={expiresAt} />
        </div>
      </CSSTransition>
      <Backdrop
        isBackdropOpen={isOpen ?? false}
        // isBackdropOpen={false}
        onClose={() => {}}
      />
    </>,
    document.getElementById("modals-root") as HTMLDivElement,
  );
}
