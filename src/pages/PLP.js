import { Component } from "react";
import PropTypes from "prop-types";
import { gql } from "@apollo/client";
import { Query } from "@apollo/client/react/components";

import classes from "./PLP.module.css";
import ProductList from "../components/Products/ProductList/ProductList";

class PLP extends Component {
  render() {
    const { page } = this.props;
    const productsQuery = gql`
      query ($category: String!) {
        category(input: { title: $category }) {
          products {
            id
            name
            brand
            inStock
            gallery
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

    return (
      <section className={classes.main}>
        <h1 className={classes.title}>{page}</h1>
        <Query query={productsQuery} variables={{ category: page }}>
          {(props) => {
            const { data } = props;
            let content;
            if (data) {
              content = <ProductList products={data.category.products} />;
            }
            return content;
          }}
        </Query>
      </section>
    );
  }
}

PLP.propTypes = {
  page: PropTypes.string.isRequired,
};

export default PLP;
