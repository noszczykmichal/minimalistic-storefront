import classes from "@/components/UI/Hr/Hr.module.css";

export default function Hr({ customClass }: { customClass: string }) {
  const attachedClasses = [classes.hr, customClass].join(" ");

  return <div className={attachedClasses} />;
}
