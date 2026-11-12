import Button from "@/components/UI/Button/Button";
import Modal from "@/components/UI/Modal/Modal";
import classes from "@/pages/PDP/MissingAttributesModal/MissingAttributesModal.module.css";

export default function MissingAttributesModal({
  notSelected,
  onCloseModal,
  isOpen,
}: {
  notSelected: string[];
  onCloseModal: () => void;
  isOpen: boolean;
}) {
  return (
    <Modal isOpen={isOpen} onClose={onCloseModal} header="Missing Attributes">
      <div className={classes.modal__body}>
        <p>Please select below options:</p>
        <ul className={classes.modal__attributes}>
          {notSelected.map((attribute) => (
            <li key={attribute} className={classes.modal__attribute}>
              {attribute}
            </li>
          ))}
        </ul>
        <Button className={classes.modal__button} onClick={onCloseModal}>
          OK
        </Button>
      </div>
    </Modal>
  );
}
