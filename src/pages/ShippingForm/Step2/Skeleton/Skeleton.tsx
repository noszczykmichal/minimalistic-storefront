/* eslint-disable react/no-array-index-key */
import classes from "@/pages/ShippingForm/Step2/Skeleton/Skeleton.module.css";

export default function Skeleton({ retry }: { retry: () => void }) {
  return (
    <>
      <div>
        <div className={classes.fieldset__legend} />

        {Array.from({ length: 4 }).map((__, index) => (
          <div key={index} className={classes["field-wrapper"]} />
        ))}
      </div>

      <div className={classes.fieldset}>
        <div className={classes.fieldset__legend} />

        {Array.from({ length: 4 }).map((__, index) => (
          <div key={index} className={classes["field-wrapper"]} />
        ))}
      </div>
      <div className={classes.banner} role="alert">
        <svg
          className={classes.banner__icon}
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <circle cx="12" cy="12" r="9" />
          <path d="M12 8v4M12 16h.01" />
        </svg>
        <div>
          <p className={classes.banner__message}>
            Couldn&apos;t load shipping options.
          </p>
          <button
            type="button"
            className={classes.banner__retry}
            onClick={retry}
          >
            Try again
          </button>
        </div>
      </div>
    </>
  );
}
