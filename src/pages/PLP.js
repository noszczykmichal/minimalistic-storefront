import { Component } from "react";
import PropTypes from "prop-types";
import { gql } from "@apollo/client";
import { Query } from "@apollo/client/react/components";
import { connect } from "react-redux";

import classes from "./PLP.module.css";
import ProductList from "../components/Products/ProductList/ProductList";

class PLP extends Component {
  render() {
    const { history, billingCurrency } = this.props;
    const { pathname } = history.location;
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
        <h1 className={classes.title}>{searchedCategory}</h1>
        <Query query={productsQuery} variables={{ category: searchedCategory }}>
          {(props) => {
            const { data } = props;
            let content;
            if (data) {
              const updatedProducts = data.category.products.map((product) => ({
                ...product,
                prices: product.prices.filter(
                  (price) => price.currency.symbol === billingCurrency,
                ),
              }));

              content = <ProductList products={updatedProducts} />;
            }
            return content;
          }}
        </Query>
      </section>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    billingCurrency: state.products.billingCurrency,
  };
};

PLP.propTypes = {
  history: PropTypes.shape({
    location: PropTypes.shape({
      pathname: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  billingCurrency: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(PLP);
