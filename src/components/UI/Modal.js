import { Component, createRef } from "react";
import { CSSTransition } from "react-transition-group";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import classes from "./Modal.module.css";
import Button from "./Button";

class Modal extends Component {
  constructor(props) {
    super(props);
    const { modalToggle, backdropVisibilityToggle } = this.props;
    this.modalToggle = modalToggle;
    this.backdropVisibilityToggle = backdropVisibilityToggle;
    this.modalRef = createRef();
  }

  modalHandler = () => {
    this.modalToggle(false);
    this.backdropVisibilityToggle(false);
  };

  render() {
    const { isModalOpen, notSelected } = this.props;
    return (
      <CSSTransition
        nodeRef={this.modalRef}
        in={isModalOpen}
        timeout={500}
        classNames={{
          enter: "",
          enterActive: classes["modal--open"],
          exit: "",
          exitActive: classes["modal--closed"],
        }}
        mountOnEnter
        unmountOnExit
      >
        <div className={classes.modal} ref={this.modalRef}>
          <h5 className={classes.modal__header}>Error</h5>
          <p>Please select below options:</p>
          <ul className={classes.modal__attributes}>
            {notSelected.map((attribute) => (
              <li key={attribute} className={classes.modal__attribute}>
                {attribute}
              </li>
            ))}
          </ul>
          <Button
            customClass={classes.modal__button}
            clicked={this.modalHandler}
          >
            OK
          </Button>
        </div>
      </CSSTransition>
    );
  }
}

const mapStateToProps = (state) => {
  return { isModalOpen: state.ui.isModalOpen };
};

const mapDispatchToProps = (dispatch) => {
  return {
    modalToggle: (isOpen) =>
      dispatch({ type: "ui/modalToggle", payload: isOpen }),
    backdropVisibilityToggle: (isOpen) =>
      dispatch({ type: "ui/backdropVisibilityToggle", payload: isOpen }),
  };
};

Modal.propTypes = {
  isModalOpen: PropTypes.bool.isRequired,
  modalToggle: PropTypes.func.isRequired,
  backdropVisibilityToggle: PropTypes.func.isRequired,
  notSelected: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Modal);
