import classes from "./ThumbnailArrow.module.css";
import { ThumbnailArrowVariant } from "../../models/utility-models";

function ThumbnailArrow({
  variant,
  clicked,
}: {
  variant: ThumbnailArrowVariant;
  clicked: (event: React.MouseEvent) => void;
}) {
  const attachedClass =
    variant === "left" ? classes["button--left"] : classes["button--right"];
  return (
    <button
      type="button"
      className={[classes.button, attachedClass].join(" ")}
      onClick={clicked}
    >
      <svg
        width="8"
        height="14"
        viewBox="0 0 8 14"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M7.25 1.06857L1.625 6.6876L7.25 12.3066"
          stroke="white"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}

export default ThumbnailArrow;
