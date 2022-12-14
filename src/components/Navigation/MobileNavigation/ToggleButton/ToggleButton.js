import { Component } from "react";

import classes from "./ToggleButton.module.css";

class ToggleButton extends Component {
  render() {
    return (
      <button type="button" className={classes.toggle}>
        <div className={classes.toggle__bar} />
        <div className={classes.toggle__bar} />
        <div className={classes.toggle__bar} />
      </button>
    );
  }
}

export default ToggleButton;
