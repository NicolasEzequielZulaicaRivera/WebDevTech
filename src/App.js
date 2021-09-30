import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from "react-router-dom";
import './App.css';

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
} from "@apollo/client";

import ExchangeRates from "./components/ExchangeRates";

const ratesClient = new ApolloClient({
  uri: 'https://48p1r2roz4.sse.codesandbox.io', // uri specifies the URL of our GraphQL server.
  cache: new InMemoryCache() // cache is an instance of InMemoryCache, which Apollo Client uses to cache query results after fetching them.
});

function App() {
  return (
    <Router>
      <div className="App">
        <div className="navbar">
          <Link to="/Rates">EXCHANGE RATES</Link>
          <Link to="/Dogs">DOGS</Link>
          <Link to="/Other">OTHER</Link>
        </div>

        <div className="main-container" >
        <Switch>

          <Route path="/Rates">
            <ApolloProvider client={ratesClient}>
              <ExchangeRates />
            </ApolloProvider>
          </Route>

        </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
