import { useNavigate } from "react-router";

import Button from "../../UI/Button";
import classes from "./ActionButtons.module.css";

interface ActionButtonsProps {
  isNextBttnDisabled: boolean;
  nextBttnPath: string;
}

function ActionButtons({
  isNextBttnDisabled,
  nextBttnPath,
}: ActionButtonsProps) {
  const navigate = useNavigate();

  const backButtonClickHandler = () => navigate(-1);

  return (
    <div className={classes["actions-wrapper"]}>
      <Button
        customClass={classes["actions-wrapper__button"]}
        clicked={backButtonClickHandler}
      >
        Back
      </Button>
      <Button
        customClass={classes["actions-wrapper__button"]}
        isDisabled={isNextBttnDisabled}
        clicked={() => navigate(`${nextBttnPath}`)}
      >
        Next
      </Button>
    </div>
  );
}

export default ActionButtons;
