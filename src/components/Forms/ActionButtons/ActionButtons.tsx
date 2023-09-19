import { useNavigate } from "react-router";

import Button from "../../UI/Button/Button";
import classes from "./ActionButtons.module.css";

interface ActionButtonsProps {
  isNextBttnDisabled: boolean;
  nextBttnPath: string;
  customClass?: string;
  nextBttnCustomText?: string;
}

function ActionButtons({
  isNextBttnDisabled,
  nextBttnPath,
  customClass,
  nextBttnCustomText,
}: ActionButtonsProps) {
  const navigate = useNavigate();
  const attachedClasses = [classes["actions-wrapper"], customClass].join(" ");

  const backButtonClickHandler = () => navigate(-1);
  const nextButtonClickHandler = () => navigate(`${nextBttnPath}`);

  return (
    <div className={attachedClasses}>
      <Button
        customClass={classes["actions-wrapper__button"]}
        clicked={backButtonClickHandler}
      >
        Back
      </Button>
      <Button
        customClass={classes["actions-wrapper__button"]}
        isDisabled={isNextBttnDisabled}
        clicked={nextButtonClickHandler}
      >
        {nextBttnCustomText}
      </Button>
    </div>
  );
}

ActionButtons.defaultProps = {
  customClass: "",
  nextBttnCustomText: "Next",
};

export default ActionButtons;
