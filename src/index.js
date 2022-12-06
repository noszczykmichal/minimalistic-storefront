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
import { PersistGate } from "redux-persist/integration/react";

import "./index.css";
import App from "./App";
import { persistor, store } from "./store/store";

const root = ReactDOM.createRoot(document.getElementById("root"));

const client = new ApolloClient({
  uri: "https://storefront-endpoint.herokuapp.com/graphql",
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
          <PersistGate loading={null} persistor={persistor}>
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
          </PersistGate>
        </Provider>
      </ApolloProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
