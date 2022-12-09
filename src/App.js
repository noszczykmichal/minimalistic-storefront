import React, { Suspense, Component } from "react";
import { connect } from "react-redux";
import { Switch, Route, withRouter } from "react-router-dom";
import PropTypes from "prop-types";

import Layout from "./components/Layout/Layout";
import Loader from "./components/UI/Loader";

const PLP = React.lazy(() => import("./pages/PLP"));
const PDP = React.lazy(() => import("./pages/PDP"));
const Cart = React.lazy(() => import("./pages/Cart"));

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
        <Suspense fallback={<Loader />}>
          <Switch>
            {categories.map((category) => (
              <Route
                key={category}
                path={category === "all" ? "/" : `/${category}`}
                exact
                component={PLP}
              />
            ))}
            <Route path="/cart" component={Cart} />
            <Route path="*" component={PDP} />
          </Switch>
        </Suspense>
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

export default withRouter(connect(null, mapDispatchToProps)(App));
