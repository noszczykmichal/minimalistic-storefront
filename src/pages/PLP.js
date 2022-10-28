/* eslint-disable react/prop-types */
import { Component } from "react";

class PLP extends Component {
  render() {
    const { path } = this.props;
    return <h1>{path}</h1>;
  }
}

export default PLP;
