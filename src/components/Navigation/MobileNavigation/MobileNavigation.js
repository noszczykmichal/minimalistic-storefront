import { Component, createRef } from "react";
import { CSSTransition } from "react-transition-group";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import classes from "./MobileNavigation.module.css";
import NavigationItems from "../NavigationItems/NavigationItems";

class MobileNavigation extends Component {
  constructor(props) {
    super(props);
    this.nodeRef = createRef();
  }

  render() {
    const { categories, isMobileNavOpen } = this.props;
    return (
      <CSSTransition
        nodeRef={this.nodeRef}
        in={isMobileNavOpen}
        timeout={500}
        classNames={{
          enter: "",
          enterActive: classes["mobile-navigation--open"],
          exit: "",
          exitActive: classes["mobile-navigation--closed"],
        }}
        mountOnEnter
        unmountOnExit
      >
        <nav className={classes["mobile-navigation"]} ref={this.nodeRef}>
          <NavigationItems categories={categories} />
        </nav>
      </CSSTransition>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    categories: state.ui.categories,
    isMobileNavOpen: state.ui.isMobileNavOpen,
  };
};

MobileNavigation.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.string).isRequired,
  isMobileNavOpen: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps)(MobileNavigation);
