import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  gql,
  QueryResult,
  OperationVariables,
} from "@apollo/client";
import { Provider } from "react-redux";
import { Query } from "@apollo/client/react/components";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "./store/store";

import "./index.css";
import App from "./App";
import Loader from "./components/UI/Loader";
import ErrorModal from "./components/UI/ErrorModal";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);

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
          <PersistGate loading={<Loader />} persistor={persistor}>
            <Query query={categoriesAndCurrenciesQuery}>
              {(props: QueryResult<any, OperationVariables>) => {
                const { data, loading, error } = props;
                let content = null;

                if (loading) {
                  content = <Loader />;
                }

                if (data && data.categories && data.currencies) {
                  const fetchedCategories = data.categories.map(
                    (category: { name: string }) => category.name,
                  );

                  content = (
                    <App
                      categories={fetchedCategories}
                      currencies={data.currencies}
                    />
                  );
                }

                if (error) {
                  content = <ErrorModal errorDetails={error} />;
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
