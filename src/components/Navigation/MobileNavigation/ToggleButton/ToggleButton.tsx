import { uiActions } from "@/store/uiSlice";
import { useAppDispatch } from "@/hooks/useReduxHooks";
import classes from "@/components/Navigation/MobileNavigation/ToggleButton/ToggleButton.module.css";

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
