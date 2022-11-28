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
    const {
      currencySwitcherVisibToggle,
      backdropVisibilityToggle,
      miniCartVisibilityToggle,
      modalToggle,
    } = this.props;
    this.backdropVisibilityToggle = backdropVisibilityToggle;
    this.currencySwitcherVisibToggle = currencySwitcherVisibToggle;
    this.miniCartVisibilityToggle = miniCartVisibilityToggle;
    this.modalToggle = modalToggle;
  }

  onBackdropClick = () => {
    this.currencySwitcherVisibToggle(false);
    this.backdropVisibilityToggle(false);
    this.miniCartVisibilityToggle(false);
    this.modalToggle(false);
  };

  render() {
    const { isBackdropTransparent, isBackdropOpen } = this.props;

    return (
      <CSSTransition
        in={isBackdropOpen}
        timeout={500}
        nodeRef={this.backdropRef}
        classNames={{
          enter: "",
          enterActive: classes["backdrop--open"],
          exit: "",
          exitActive: classes["backdrop--closed"],
        }}
        mountOnEnter
        unmountOnExit
      >
        <div
          className={
            isBackdropTransparent
              ? classes.backdrop
              : [classes.backdrop, classes["backdrop--grey"]].join(" ")
          }
          onClick={this.onBackdropClick}
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

const mapDispatchToProps = (dispatch) => {
  return {
    backdropVisibilityToggle: (isOpen) =>
      dispatch({ type: "ui/backdropVisibilityToggle", payload: isOpen }),
    currencySwitcherVisibToggle: (isOpen) =>
      dispatch({ type: "ui/currencySwitcherVisibToggle", payload: isOpen }),
    miniCartVisibilityToggle: (isOpen) =>
      dispatch({ type: "ui/miniCartVisibilityToggle", payload: isOpen }),
    modalToggle: (isOpen) =>
      dispatch({ type: "ui/modalToggle", payload: isOpen }),
  };
};

Backdrop.propTypes = {
  isBackdropOpen: PropTypes.bool.isRequired,
  isBackdropTransparent: PropTypes.bool.isRequired,
  backdropVisibilityToggle: PropTypes.func.isRequired,
  currencySwitcherVisibToggle: PropTypes.func.isRequired,
  miniCartVisibilityToggle: PropTypes.func.isRequired,
  modalToggle: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Backdrop);
