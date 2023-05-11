import classes from "./Loader.module.css";

function Loader() {
  return (
    <div className={classes["loader-container"]}>
      <div className={classes["lds-ripple"]}>
        <div />
        <div />
      </div>
    </div>
  );
}

export default Loader;
