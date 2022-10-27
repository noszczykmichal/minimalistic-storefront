/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { Component, createRef } from "react";
import PropTypes from "prop-types";
import { CSSTransition } from "react-transition-group";

import classes from "./Backdrop.module.css";

class Backdrop extends Component {
  constructor(props) {
    super(props);
    this.backdropRef = createRef();
  }

  render() {
    const { show, clicked } = this.props;

    return (
      <CSSTransition
        in={show}
        timeout={200}
        nodeRef={this.backdropRef}
        classNames={{ enter: "", enterActive: "", exit: "", exitActive: "" }}
      >
        <div
          className={classes["backdrop--transparent"]}
          onClick={clicked}
          ref={this.backdropRef}
        />
      </CSSTransition>
    );
  }
}

Backdrop.propTypes = {
  show: PropTypes.bool.isRequired,
  clicked: PropTypes.func.isRequired,
};

export default Backdrop;
