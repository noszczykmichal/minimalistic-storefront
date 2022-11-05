/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
import { Component } from "react";
import { connect } from "react-redux";

class PDP extends Component {
  render() {
    return <h1>{this.props.displayedProduct}</h1>;
  }
}

const mapStateToProps = (state) => {
  return {
    displayedProduct: state.products.currentPDP,
  };
};

export default connect(mapStateToProps)(PDP);
