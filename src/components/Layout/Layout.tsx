import { ReactNode } from "react";

import classes from "./Layout.module.css";
import Toolbar from "../Navigation/Toolbar/Toolbar";
import MobileNavigation from "../Navigation/MobileNavigation/MobileNavigation";

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
