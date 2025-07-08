import { ReactNode } from "react";

import Toolbar from "@/components/Navigation/Toolbar/Toolbar";
import MobileNavigation from "@/components/Navigation/MobileNavigation/MobileNavigation";
import classes from "@/components/Layout/Layout.module.css";

function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <Toolbar />
      <MobileNavigation />
      <main className={classes.main}>{children}</main>
    </>
  );
}

export default Layout;
