import { useRef } from "react";
import { createPortal } from "react-dom";
import { CSSTransition } from "react-transition-group";

import Button from "@/components/UI/Button/Button";
import { uiActions } from "@/store/uiSlice";
import { useAppSelector, useAppDispatch } from "@/hooks/useReduxHooks";
import classes from "@/components/UI/MissingAttributesModal/MissingAttributesModal.module.css";

export default function MissingAttributesModal({
  notSelected,
}: {
  notSelected: (string | null)[];
}) {
  const modalRef = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();
  const { isModalOpen } = useAppSelector((state) => state.ui);
  const { modalToggle, backdropVisibilityToggle } = uiActions;

  const modalHandler = () => {
    dispatch(modalToggle(false));
    dispatch(backdropVisibilityToggle(false));
  };

  return createPortal(
    <CSSTransition
      nodeRef={modalRef}
      in={isModalOpen}
      timeout={500}
      classNames={{
        enter: "",
        enterActive: "modal--open",
        exit: "",
        exitActive: "modal--closed",
      }}
      mountOnEnter
      unmountOnExit
    >
      <div className="modal" ref={modalRef}>
        <h5 className="modal__header">Error</h5>
        <p>Please select below options:</p>
        <ul className={classes.modal__attributes}>
          {notSelected.map((attribute) => (
            <li key={attribute} className={classes.modal__attribute}>
              {attribute}
            </li>
          ))}
        </ul>
        <Button customClass={classes.modal__button} clicked={modalHandler}>
          OK
        </Button>
      </div>
    </CSSTransition>,
    document.getElementById("modals-root") as HTMLDivElement,
  );
}
