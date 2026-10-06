import { useRef } from "react";
import { createPortal } from "react-dom";
import { CSSTransition } from "react-transition-group";

import { useAppSelector } from "@/hooks/useReduxHooks";
import classes from "@/components/Register/RegisterModal/RegisterModal.module.css";

export default function RegisterModal() {
  const registerModalRef = useRef<HTMLDivElement>(null);
  const { isRegistrationModalOpen } = useAppSelector((state) => state.ui);

  return createPortal(
    <CSSTransition
      in={isRegistrationModalOpen}
      timeout={300}
      nodeRef={registerModalRef}
      classNames={{
        enter: "",
        enterActive: "modal--open",
        exit: "",
        exitActive: "modal--closed",
      }}
      mountOnEnter
      unmountOnExit
    >
      <div role="dialog" className="modal" ref={registerModalRef}>
        <h5 className="modal__header">Sign up</h5>
      </div>
    </CSSTransition>,
    document.getElementById("modals-root") as HTMLDivElement,
  );
}
