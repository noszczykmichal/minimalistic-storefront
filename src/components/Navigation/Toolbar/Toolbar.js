import { Component } from "react";
import { gql } from "@apollo/client";
import { Query } from "@apollo/client/react/components";

import NavigationItems from "../NavigationItems/NavigationItems";
import classes from "./Toolbar.module.css";
import Logo from "./Logo/Logo";
import CartIcon from "./CartIcon/CartIcon";
import CurrencySwitcher from "./CurrencySwitcher/CurrencySwitcher";

const navItemsQuery = gql`
  query {
    categories {
      name
    }
  }
`;

const currencyQuery = gql`
  query {
    currencies {
      label
      symbol
    }
  }
`;

class Toolbar extends Component {
  render() {
    return (
      <div className={classes.toolbar}>
        <Query query={navItemsQuery}>
          {(props) => {
            const { data } = props;
            let content;
            if (data) {
              content = <NavigationItems categories={data.categories} />;
            }
            return content;
          }}
        </Query>
        <Logo />
        <div className={classes["cart-actions"]}>
          <Query query={currencyQuery}>
            {(props) => {
              const { data } = props;
              return data ? (
                <CurrencySwitcher currencies={data.currencies} />
              ) : null;
            }}
          </Query>
          <CartIcon />
        </div>
      </div>
    );
  }
}

export default Toolbar;
