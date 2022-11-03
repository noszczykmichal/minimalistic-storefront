import { Component } from "react";
import { connect } from "react-redux";
import { Routes, Route } from "react-router-dom";
import PropTypes from "prop-types";

import Layout from "./components/Layout/Layout";
import PLP from "./pages/PLP";

class App extends Component {
  constructor(props) {
    super(props);
    const { categories, currencies, saveCategoriesAndCurrencies } = this.props;
    this.saveCategoriesAndCurrencies = saveCategoriesAndCurrencies;
    this.categories = categories;
    this.currencies = currencies;
  }

  componentDidMount() {
    this.saveCategoriesAndCurrencies(this.categories, this.currencies);
  }

  render() {
    const { categories } = this.props;
    return (
      <Layout>
        <Routes>
          {categories.map((category) => (
            <Route
              key={category}
              path={category === "all" ? "/" : category}
              exact={category === "all"}
              element={<PLP page={category} />}
            />
          ))}
        </Routes>
      </Layout>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    saveCategoriesAndCurrencies: (categories, currencies) =>
      dispatch({
        type: "ui/saveCategoriesAndCurrencies",
        payload: { categories, currencies },
      }),
  };
};
App.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.string).isRequired,
  currencies: PropTypes.arrayOf(
    PropTypes.shape({
      __typename: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      symbol: PropTypes.string.isRequired,
    }),
  ).isRequired,
  saveCategoriesAndCurrencies: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(App);
