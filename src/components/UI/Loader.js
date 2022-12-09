import { Component } from "react";

import classes from "./Loader.module.css";

class Loader extends Component {
  render() {
    return (
      <div className={classes["loader-container"]}>
        <div className={classes["lds-ripple"]}>
          <div />
          <div />
        </div>
      </div>
    );
  }
}

export default Loader;
