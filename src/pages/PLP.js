import { useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import { gql, useQuery } from "@apollo/client";

import classes from "./PLP.module.css";
import ProductList from "../components/Products/ProductList/ProductList";
import Loader from "../components/UI/Loader";

function PLP() {
  const { location } = useLocation();
  const pathname = location.history;
  const searchedCategory = pathname === "/" ? "all" : pathname.substring(1);
  const productsQuery = gql`
    query ($category: String!) {
      category(input: { title: $category }) {
        products {
          id
          name
          brand
          inStock
          gallery
          description
          attributes {
            name
            items {
              displayValue
              value
            }
          }
          prices {
            currency {
              label
              symbol
            }
            amount
          }
        }
      }
    }
  `;

  const { loading, data } = useQuery(productsQuery, {
    category: searchedCategory,
  });
  let content;
  if (loading) {
    content = <Loader />;
  }

  if (data) {
    content = <ProductList products={data.category.products} />;
  }

  return (
    <section className={classes.main}>
      <h1 className={classes.title}>{searchedCategory}</h1>
      {content}
    </section>
  );
}

PLP.propTypes = {
  history: PropTypes.shape({
    location: PropTypes.shape({
      pathname: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default PLP;
