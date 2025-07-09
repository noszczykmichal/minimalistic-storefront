import classes from "@/components/UI/Loader/Loader.module.css";

export default function Loader() {
  return (
    <div className={classes["loader-container"]}>
      <div className={classes["lds-ripple"]}>
        <div />
        <div />
      </div>
    </div>
  );
}
