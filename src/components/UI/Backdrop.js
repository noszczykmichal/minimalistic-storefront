/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { Component, createRef } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { CSSTransition } from "react-transition-group";

import classes from "./Backdrop.module.css";

class Backdrop extends Component {
  constructor(props) {
    super(props);
    this.backdropRef = createRef();
  }

  render() {
    const { isBackdropTransparent, clicked, isBackdropOpen } = this.props;
    const attachedClasses = {
      enter: "",
      enterActive: classes["transparent--open"],
      exit: "",
      exitActive: classes["transparent--closed"],
    };

    return (
      <CSSTransition
        in={isBackdropOpen}
        timeout={300}
        nodeRef={this.backdropRef}
        classNames={attachedClasses}
        mountOnEnter
        unmountOnExit
      >
        <div
          className={
            isBackdropTransparent ? classes["backdrop--transparent"] : null
          }
          onClick={clicked}
          ref={this.backdropRef}
        />
      </CSSTransition>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isBackdropOpen: state.ui.isBackdropOpen,
    isBackdropTransparent: state.ui.isBackdropTransparent,
  };
};

Backdrop.propTypes = {
  clicked: PropTypes.func.isRequired,
  isBackdropOpen: PropTypes.bool.isRequired,
  isBackdropTransparent: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps)(Backdrop);
