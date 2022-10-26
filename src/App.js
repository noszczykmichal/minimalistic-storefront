import { Component } from "react";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";

import Layout from "./components/Layout/Layout";

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache(),
});

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <div className="App">
          <Layout />
        </div>
      </ApolloProvider>
    );
  }
}

export default App;
