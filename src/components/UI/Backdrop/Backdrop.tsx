/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useRef } from "react";
import { CSSTransition } from "react-transition-group";

import classes from "@/components/UI/Backdrop/Backdrop.module.css";

type BackdropMode = "light" | "dark";

interface BackdropProps {
  isBackdropOpen: boolean;
  backdropMode?: BackdropMode;
  onClose: () => void;
}

export default function Backdrop({
  isBackdropOpen,
  backdropMode = "dark",
  onClose,
}: BackdropProps) {
  const backdropRef = useRef<HTMLDivElement>(null);

  return (
    <CSSTransition
      in={isBackdropOpen}
      timeout={500}
      nodeRef={backdropRef}
      classNames={{
        enter: "",
        enterActive: classes["backdrop--open"],
        exit: "",
        exitActive: classes["backdrop--closed"],
      }}
      mountOnEnter
      unmountOnExit
    >
      <div
        className={
          backdropMode === "dark"
            ? [classes.backdrop, classes["backdrop--grey"]].join(" ")
            : classes.backdrop
        }
        onClick={onClose}
        ref={backdropRef}
      />
    </CSSTransition>
  );
}
