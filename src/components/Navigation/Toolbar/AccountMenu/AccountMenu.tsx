import { useEffect, useId, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { CSSTransition } from "react-transition-group";

import Backdrop from "@/components/UI/Backdrop/Backdrop";
import PersonIcon from "@/components/UI/PersonIcon/PersonIcon";
import { logOut } from "@/api/client";
import { authActions } from "@/store/auth/auth";
import { uiActions } from "@/store/ui/ui";
import { useAppDispatch, useAppSelector } from "@/hooks/useReduxHooks";
import { User } from "@/types/types";
import classes from "@/components/Navigation/Toolbar/AccountMenu/AccountMenu.module.css";

export default function AccountMenu({ user }: { user: User }) {
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [menuRight, setMenuRight] = useState<number>();
  const menuId = useId();
  const dispatch = useAppDispatch();
  const { isAccountMenuOpen } = useAppSelector((state) => state.ui);
  const wasAccountMenuOpen = useRef(isAccountMenuOpen);
  const {
    accountMenuVisibilityToggle,
    currencySwitcherVisibToggle,
    miniCartVisibilityToggle,
  } = uiActions;
  const { clearSessionData } = authActions;

  // Align the menu's right edge with the account button.
  useLayoutEffect(() => {
    if (!isAccountMenuOpen) {
      return undefined;
    }

    const updateMenuPosition = () => {
      const buttonRight = buttonRef.current?.getBoundingClientRect().right;

      if (buttonRight !== undefined) {
        setMenuRight(document.documentElement.clientWidth - buttonRight);
      }
    };

    updateMenuPosition();
    window.addEventListener("resize", updateMenuPosition);
    return () => window.removeEventListener("resize", updateMenuPosition);
  }, [isAccountMenuOpen]);

  // Move focus into the menu when it opens and back to the account button
  // when it closes (Escape or backdrop click).
  useEffect(() => {
    if (isAccountMenuOpen) {
      menuRef.current?.focus();
    } else if (wasAccountMenuOpen.current) {
      buttonRef.current?.focus();
    }
    wasAccountMenuOpen.current = isAccountMenuOpen;
  }, [isAccountMenuOpen]);

  useEffect(() => {
    if (!isAccountMenuOpen) {
      return undefined;
    }

    const onKeyDownHandler = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        dispatch(accountMenuVisibilityToggle(false));
      }
    };

    document.addEventListener("keydown", onKeyDownHandler);
    return () => document.removeEventListener("keydown", onKeyDownHandler);
  }, [isAccountMenuOpen, dispatch, accountMenuVisibilityToggle]);

  const onOpen = () => {
    dispatch(accountMenuVisibilityToggle(true));
    dispatch(currencySwitcherVisibToggle(false));
    dispatch(miniCartVisibilityToggle(false));
  };

  const onClose = () => {
    dispatch(accountMenuVisibilityToggle(false));
  };

  const onLogOut = async () => {
    dispatch(accountMenuVisibilityToggle(false));

    try {
      await logOut();
    } catch {
      // Log out locally even if the server couldn't end the session.
    }

    dispatch(clearSessionData());
  };

  return (
    <>
      <button
        type="button"
        className={classes["account-button"]}
        onClick={onOpen}
        aria-label="Account menu"
        aria-haspopup="dialog"
        aria-expanded={!!isAccountMenuOpen}
        aria-controls={menuId}
        ref={buttonRef}
      >
        <span className={classes["account-button__icon"]}>
          <PersonIcon />
        </span>
      </button>

      {createPortal(
        <CSSTransition
          in={isAccountMenuOpen}
          timeout={300}
          classNames={{
            enter: "",
            enterActive: classes["account-menu--open"],
            exit: "",
            exitActive: classes["account-menu--closed"],
          }}
          nodeRef={menuRef}
          mountOnEnter
          unmountOnExit
        >
          <div
            id={menuId}
            role="dialog"
            aria-label="Account"
            tabIndex={-1}
            className={classes["account-menu"]}
            style={{ right: menuRight }}
            ref={menuRef}
          >
            <p className={classes["account-menu__user"]}>
              <span className={classes.user__label}>Signed in as</span>
              <span className={classes.user__email}>{user.email}</span>
            </p>
            <button
              type="button"
              className={classes["account-menu__logout"]}
              onClick={onLogOut}
            >
              Log out
            </button>
          </div>
        </CSSTransition>,
        document.getElementById("modals-root") as HTMLDivElement,
      )}

      {createPortal(
        <Backdrop
          isBackdropOpen={isAccountMenuOpen}
          backdropMode="light"
          onClose={onClose}
        />,
        document.getElementById("modals-root") as HTMLDivElement,
      )}
    </>
  );
}
