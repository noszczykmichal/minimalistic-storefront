import PropTypes from "prop-types";

import classes from "./Layout.module.css";
import Toolbar from "../Navigation/Toolbar/Toolbar";
import MobileNavigation from "../Navigation/MobileNavigation/MobileNavigation";

function Layout({ children }) {
  return (
    <>
      <Toolbar />
      <MobileNavigation />
      <main className={classes.main}>{children}</main>
    </>
  );
}

Layout.propTypes = {
  children: PropTypes.element.isRequired,
};

export default Layout;
