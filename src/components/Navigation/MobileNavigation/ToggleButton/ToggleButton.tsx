import { createPortal } from "react-dom";

import { uiActions } from "@/store/uiSlice";
import { useAppDispatch, useAppSelector } from "@/hooks/useReduxHooks";
import Backdrop from "@/components/UI/Backdrop/Backdrop";
import classes from "@/components/Navigation/MobileNavigation/ToggleButton/ToggleButton.module.css";

export default function ToggleButton() {
  const dispatch = useAppDispatch();
  const { isMobileNavOpen } = useAppSelector((state) => state.ui);

  const { miniCartVisibilityToggle, mobileNavVisibilityToggle } = uiActions;

  const onToggleButtonClick = () => {
    dispatch(miniCartVisibilityToggle(false));
    dispatch(mobileNavVisibilityToggle(true));
  };

  const onBackdropClick = () => {
    dispatch(mobileNavVisibilityToggle(false));
  };

  return (
    <>
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
      {createPortal(
        <Backdrop isBackdropOpen={isMobileNavOpen} onClose={onBackdropClick} />,
        document.getElementById("modals-root") as HTMLDivElement,
      )}
    </>
  );
}
