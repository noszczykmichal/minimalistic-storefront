import { Component } from "react";

import { Routes, Route } from "react-router-dom";

import Layout from "./components/Layout/Layout";
import PLP from "./pages/PLP";

// const categories = [];

class App extends Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     categories: [],
  //   };
  // }

  render() {
    const { data } = this.props;
    console.log(data);
    return (
      <Layout>
        <Routes>
          <Route path="/" element={<PLP path="/" />} />
        </Routes>
      </Layout>
    );
  }
}

export default App;

// {categories.map((el) => (
//   <Route
//     path={el === "all" ? "/" : el}
//     exact={el === "all"}
//     element={<PLP path={el} />}
//   />
// ))}
