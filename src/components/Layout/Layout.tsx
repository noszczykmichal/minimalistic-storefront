import { ReactNode } from "react";

import Toolbar from "@/components/Navigation/Toolbar/Toolbar";
import MobileNavigation from "@/components/Navigation/MobileNavigation/MobileNavigation";
import Toast from "@/components/UI/Toast/Toast";
import classes from "@/components/Layout/Layout.module.css";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <Toolbar />
      <MobileNavigation />
      <Toast />
      <main className={classes.main}>{children}</main>
    </>
  );
}
