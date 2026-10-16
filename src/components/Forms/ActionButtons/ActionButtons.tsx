import clsx from "clsx";

import Button from "@/components/UI/Button/Button";
import classes from "@/components/Forms/ActionButtons/ActionButtons.module.css";

interface ActionButtonsProps {
  isNextBttnDisabled?: boolean;
  nextButtonHandler: () => void;
  backButtonHandler: () => void;
  customClass?: string;
  nextBttnCustomText?: string;
  backBttnCustomText?: string;
}

export default function ActionButtons({
  isNextBttnDisabled = false,
  nextButtonHandler,
  backButtonHandler,
  customClass = "",
  nextBttnCustomText = "Next",
  backBttnCustomText = "Back",
}: ActionButtonsProps) {
  return (
    <div
      className={clsx(classes["actions-wrapper"], customClass)}
      data-testid="actionButtonsWrapper"
    >
      <Button
        className={classes["actions__button--outline"]}

        onClick={backButtonHandler}
      >
        {backBttnCustomText}
      </Button>
      <Button
        className={classes["actions__button--filled"]}
        disabled={isNextBttnDisabled}
        onClick={nextButtonHandler}
      >
        {nextBttnCustomText}
      </Button>
    </div>
  );
}
