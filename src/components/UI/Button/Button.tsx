import { ComponentPropsWithoutRef } from "react";
import clsx from "clsx";
import classes from "@/components/UI/Button/Button.module.css";

export default function Button({
  className,
  type = "button",
  ...rest
}: ComponentPropsWithoutRef<"button">) {
  return (
    <button
      {...rest}
      type={type === "submit" ? "submit" : "button"}
      className={clsx(classes.button, className)}
    />
  );
}
