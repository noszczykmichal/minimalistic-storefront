import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router";
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

import App from "@/App";
import Loader from "@/components/UI/Loader/Loader";
import ErrorModal from "@/components/UI/ErrorModal/ErrorModal";
import { isCurrency, type Currency } from "@/types/types";
import { persistor, store } from "@/store/store";
import { restoreSession } from "@/store/auth/auth";
import { injectStore } from "./api/client";
import "@/index.css";

interface Category {
  name: string;
}

interface StoreData {
  categories: Category[];
  currencies: Currency[];
}

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
injectStore(store);

// Dispatched once, outside React, so StrictMode's double-invoked effects
// can't send two refresh requests that invalidate each other.
store.dispatch(restoreSession());

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ApolloProvider client={client}>
        <Provider store={store}>
          <PersistGate loading={<Loader />} persistor={persistor}>
            <Query query={categoriesAndCurrenciesQuery}>
              {(props: QueryResult<StoreData, OperationVariables>) => {
                const { data, loading, error } = props;
                let content = null;

                if (loading) {
                  content = <Loader />;
                }

                if (data && data?.categories && data?.currencies) {
                  const fetchedCategories = data?.categories.map(
                    (category: { name: string }) => category.name,
                  );

                  content = (
                    <App
                      categories={fetchedCategories}
                      currencies={data.currencies.filter(isCurrency)}
                    />
                  );
                }

                if (error) {
                  content = (
                    <ErrorModal>
                      <p className="error">
                        Trying to fetch from the endpoint failed with message:
                        <br />
                        <span className="error__details">{error.message}.</span>
                        <br />
                        Make sure you are connected to the Internet and try
                        again later.
                      </p>
                    </ErrorModal>
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
