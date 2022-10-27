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
    const { show, transparent, clicked } = this.props;
    const attachedClasses = {
      enter: "",
      enterActive: classes["transparent--open"],
      exit: "",
      exitActive: classes["transparent--closed"],
    };

    return (
      <CSSTransition
        in={show}
        timeout={300}
        nodeRef={this.backdropRef}
        classNames={attachedClasses}
        mountOnEnter
        unmountOnExit
      >
        <div
          className={transparent ? classes["backdrop--transparent"] : null}
          onClick={clicked}
          ref={this.backdropRef}
        />
      </CSSTransition>
    );
  }
}

Backdrop.propTypes = {
  show: PropTypes.bool.isRequired,
  transparent: PropTypes.bool.isRequired,
  clicked: PropTypes.func.isRequired,
};

export default Backdrop;
