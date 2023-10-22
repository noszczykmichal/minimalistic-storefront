import classes from "./PlusIcon.module.css";

function PlusIcon() {
  return (
    <>
      <svg
        width="15"
        height="1"
        viewBox="0 0 15 1"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M1 0.5H16"
          stroke="#1D1F22"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <svg
        className={classes["button__svg-y-axis"]}
        width="1"
        height="15"
        viewBox="0 0 1 15"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0.5 1V16"
          stroke="#1D1F22"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </>
  );
}

export default PlusIcon;
