import { ReactNode } from "react";
import { createPortal } from "react-dom";

import Toolbar from "@/components/Navigation/Toolbar/Toolbar";
import MobileNavigation from "@/components/Navigation/MobileNavigation/MobileNavigation";
import Backdrop from "@/components/UI/Backdrop/Backdrop";
import classes from "@/components/Layout/Layout.module.css";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <Toolbar />
      <MobileNavigation />
      <main className={classes.main}>{children}</main>
      {createPortal(
        <Backdrop />,
        document.getElementById("modals-root") as HTMLDivElement,
      )}
    </>
  );
}
