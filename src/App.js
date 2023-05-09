import React, { Suspense, useEffect, useRef } from "react";
import { Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";

import Layout from "./components/Layout/Layout";
import Loader from "./components/UI/Loader";
import { uiActions } from "./store/uiSlice";

const PLP = React.lazy(() => import("./pages/PLP"));
const PDP = React.lazy(() => import("./pages/PDP"));
const Cart = React.lazy(() => import("./pages/Cart"));

function App({ categories, currencies }) {
  const dispatch = useDispatch();
  const dispatchRef = useRef(dispatch);

  useEffect(() => {
    dispatchRef.current(
      uiActions.saveCategoriesAndCurrencies({ categories, currencies }),
    );
  }, [categories, currencies]);

  return (
    <Layout>
      <Suspense fallback={<Loader />}>
        <Routes>
          {categories.map((category) => (
            <Route
              key={category}
              path={category === "all" ? "/" : `/${category}`}
              element={PLP}
              exact
            />
          ))}
          <Route path="/cart" element={Cart} />
          <Route path="*" element={PDP} />
        </Routes>
      </Suspense>
    </Layout>
  );
}

// const mapDispatchToProps = (dispatch) => {
//   return {
//     saveCategoriesAndCurrencies: (categories, currencies) =>
//       dispatch({
//         type: "ui/saveCategoriesAndCurrencies",
//         payload: { categories, currencies },
//       }),
//   };
// };
App.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.string).isRequired,
  currencies: PropTypes.arrayOf(
    PropTypes.shape({
      __typename: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      symbol: PropTypes.string.isRequired,
    }),
  ).isRequired,
  // saveCategoriesAndCurrencies: PropTypes.func.isRequired,
};

export default App;
