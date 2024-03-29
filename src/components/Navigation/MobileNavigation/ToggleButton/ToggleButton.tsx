import classes from "./ToggleButton.module.css";
import { uiActions } from "../../../../store/uiSlice";
import { useAppDispatch } from "../../../../hooks/useReduxHooks";

function ToggleButton() {
  const dispatch = useAppDispatch();

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
      aria-label="Show Menu"
    >
      <div className={classes.toggle__bar} />
      <div className={classes.toggle__bar} />
      <div className={classes.toggle__bar} />
    </button>
  );
}

export default ToggleButton;
