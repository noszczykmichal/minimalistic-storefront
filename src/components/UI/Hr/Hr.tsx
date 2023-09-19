import classes from "./Hr.module.css";

function Hr({ customClass }: { customClass: string }) {
  const attachedClasses = [classes.hr, customClass].join(" ");

  return <div className={attachedClasses} />;
}

export default Hr;
