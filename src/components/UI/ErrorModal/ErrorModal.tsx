import { ReactNode } from "react";

import classes from "@/components/UI/ErrorModal/ErrorModal.module.css";

export default function ErrorModal({ children }: { children: ReactNode }) {
  return <div className={classes.container}>{children}</div>;
}
