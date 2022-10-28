import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  gql,
} from "@apollo/client";
import { Query } from "@apollo/client/react/components";

import "./index.css";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache(),
});

const categoriesQuery = gql`
  query {
    categories {
      name
    }
  }
`;

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ApolloProvider client={client}>
        <Query query={categoriesQuery}>
          {(props) => {
            const { data, error } = props;

            return data ? (
              <App data={data} />
            ) : error ? (
              <p>Something went wrong</p>
            ) : null;
          }}
        </Query>
      </ApolloProvider>
    </BrowserRouter>
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
