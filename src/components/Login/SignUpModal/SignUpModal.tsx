import Modal from "@/components/UI/Modal/Modal";

import classes from "@/components/Login/SignUpModal/SignUpModal.module.css";
import SignUpForm from "../SignUpForm/SignUpForm";

export default function SignUpModal() {
  return (
    <Modal header="Sign up" className={classes["signup-modal"]}>
      <SignUpForm />
    </Modal>
  );
}
