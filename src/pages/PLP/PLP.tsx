import { useLocation } from "react-router";
import { gql, useQuery } from "@apollo/client";

import ProductList from "@/components/Products/ProductList/ProductList";
import Loader from "@/components/UI/Loader/Loader";
import classes from "@/pages/PLP/PLP.module.css";

export const PRODUCTS_QUERY = gql`
  query ($searchedCategory: String!) {
    category(input: { title: $searchedCategory }) {
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

export default function PLP() {
  const location = useLocation();
  const { pathname } = location;
  const searchedCategory = pathname === "/" ? "all" : pathname.substring(1);

  const { loading, data } = useQuery(PRODUCTS_QUERY, {
    variables: { searchedCategory },
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
