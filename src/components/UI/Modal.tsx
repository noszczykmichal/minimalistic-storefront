import { useRef } from "react";
import { CSSTransition } from "react-transition-group";

import classes from "./Modal.module.css";
import Button from "./Button";
import { uiActions } from "../../store/uiSlice";
import { useAppSelector, useAppDispatch } from "../../hooks/useReduxHooks";

function Modal({ notSelected }: { notSelected: (string | null)[] }) {
  const modalRef = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();
  const { isModalOpen } = useAppSelector((state) => state.ui);
  const { modalToggle, backdropVisibilityToggle } = uiActions;

  const modalHandler = () => {
    dispatch(modalToggle(false));
    dispatch(backdropVisibilityToggle(false));
  };

  return (
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
      <div className={classes.modal} ref={modalRef}>
        <h5 className={classes.modal__header}>Error</h5>
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
    </CSSTransition>
  );
}

export default Modal;
