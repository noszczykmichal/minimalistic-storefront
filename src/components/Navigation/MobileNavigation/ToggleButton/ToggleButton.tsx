import { useDispatch } from "react-redux";

import classes from "./ToggleButton.module.css";
import { uiActions } from "../../../../store/uiSlice";

function ToggleButton() {
  const dispatch = useDispatch();

  const {
    backdropVisibilityToggle,
    backdropTypeToggle,
    miniCartVisibilityToggle,
    mobileNavVisibilityToggle,
  } = uiActions;

  const onToggleButtonClick = () => {
    dispatch(backdropVisibilityToggle(true));
    dispatch(backdropTypeToggle(false));
    dispatch(miniCartVisibilityToggle(false));
    dispatch(mobileNavVisibilityToggle(true));
  };

  return (
    <button
      type="button"
      className={classes.toggle}
      onClick={onToggleButtonClick}
    >
      <div className={classes.toggle__bar} />
      <div className={classes.toggle__bar} />
      <div className={classes.toggle__bar} />
    </button>
  );
}

export default ToggleButton;