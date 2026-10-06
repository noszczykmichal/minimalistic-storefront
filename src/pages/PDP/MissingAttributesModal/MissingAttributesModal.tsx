import Button from "@/components/UI/Button/Button";
import { uiActions } from "@/store/uiSlice";
import { useAppDispatch } from "@/hooks/useReduxHooks";
import Modal from "@/components/UI/Modal/Modal";
import classes from "@/pages/PDP/MissingAttributesModal/MissingAttributesModal.module.css";

export default function MissingAttributesModal({
  notSelected,
}: {
  notSelected: (string | null)[];
}) {
  const dispatch = useAppDispatch();
  const { modalToggle } = uiActions;

  const modalHandler = () => {
    dispatch(modalToggle(false));
  };

  return (
    <Modal header="Error">
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
    </Modal>
  );
}
