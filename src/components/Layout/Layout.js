import { Component } from "react";
import PropTypes from "prop-types";

import classes from "./Layout.module.css";
import Toolbar from "../Navigation/Toolbar/Toolbar";

class Layout extends Component {
  render() {
    const { children } = this.props;
    return (
      <>
        <Toolbar />
        <main className={classes.main}>{children}</main>
      </>
    );
  }
}

Layout.propTypes = {
  children: PropTypes.element.isRequired,
};

export default Layout;
