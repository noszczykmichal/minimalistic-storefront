import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  gql,
} from "@apollo/client";
import { Provider } from "react-redux";
import { Query } from "@apollo/client/react/components";
import "./index.css";
import App from "./App";
import store from "./store/store";

const root = ReactDOM.createRoot(document.getElementById("root"));

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache(),
});

const categoriesAndCurrenciesQuery = gql`
  query {
    categories {
      name
    }

    currencies {
      label
      symbol
    }
  }
`;

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ApolloProvider client={client}>
        <Provider store={store}>
          <Query query={categoriesAndCurrenciesQuery}>
            {(props) => {
              const { data } = props;
              let content;

              if (data && data.categories && data.currencies) {
                const fetchedCategories = data.categories.map(
                  (category) => category.name,
                );

                content = (
                  <App
                    categories={fetchedCategories}
                    currencies={data.currencies}
                  />
                );
              }
              return content;
            }}
          </Query>
        </Provider>
      </ApolloProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
