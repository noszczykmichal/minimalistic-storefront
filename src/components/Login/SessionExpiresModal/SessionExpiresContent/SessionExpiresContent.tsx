import clsx from "clsx";

import { useCallback, useEffect } from "react";
import { useAppDispatch } from "@/hooks/useReduxHooks";
import {
  restoreSession,
  logOutThunk,
  WARNING_SECONDS,
} from "@/store/auth/auth";
import useSecondsLeft from "@/hooks/useSecondsLeft";
import ActionButtons from "@/components/Forms/ActionButtons/ActionButtons";
import classes from "@/components/Login/SessionExpiresModal/SessionExpiresContent/SessionExpiresContent.module.css";

const DANGER_SECONDS = 10;

export default function SessionExpiresContent({
  expiresAt,
}: {
  expiresAt: number;
}) {
  const dispatch = useAppDispatch();
  const secondsLeft = useSecondsLeft(expiresAt);
  const percent = Math.min(100, ((secondsLeft - 1) / WARNING_SECONDS) * 100);
  const isDanger = secondsLeft <= DANGER_SECONDS;
  const timeFinished = secondsLeft === 0;

  const restoreSessionHandler = () => {
    dispatch(restoreSession());
  };

  const logoutHandler = useCallback(() => {
    dispatch(logOutThunk());
  }, [dispatch]);

  useEffect(() => {
    if (timeFinished) {
      logoutHandler();
    }
  }, [timeFinished, logoutHandler]);

  return (
    <div
      className={clsx(classes.content, isDanger && classes["content--danger"])}
    >
      <div className={classes.modal__head}>
        <span className={classes.modal__icon} aria-hidden="true">
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          >
            <circle cx="12" cy="12" r="9" />
            <path d="M12 7v5l3 2" />
          </svg>
        </span>
        <h5 id="session-modal-title" className={classes.modal__title}>
          Your session is about to expire
        </h5>
      </div>

      <p className={classes.modal__text}>
        For your security, you&apos;ll be logged out in{" "}
        <strong>
          <span className={classes.text__number}>{secondsLeft}</span>{" "}
          {secondsLeft === 1 ? "second" : "seconds"}
        </strong>
        .
      </p>

      <div className={classes["progress-bar"]}>
        <div
          className={classes["progress-bar__indicator"]}
          style={{ width: `${percent}%` }}
        />
      </div>

      <ActionButtons
        backButtonHandler={logoutHandler}
        backBttnCustomText="Log out"
        nextButtonHandler={restoreSessionHandler}
        nextBttnCustomText="Stay logged in"
      />
    </div>
  );
}
