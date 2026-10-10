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
  const attachedClasses = [classes["actions-wrapper"], customClass].join(" ");

  return (
    <div className={attachedClasses} data-testid="actionButtonsWrapper">
      <Button
        customClass={classes["actions-wrapper__button"]}
        clicked={backButtonHandler}
      >
        {backBttnCustomText}
      </Button>
      <Button
        customClass={classes["actions-wrapper__button"]}
        isDisabled={isNextBttnDisabled}
        clicked={nextButtonHandler}
      >
        {nextBttnCustomText}
      </Button>
    </div>
  );
}
