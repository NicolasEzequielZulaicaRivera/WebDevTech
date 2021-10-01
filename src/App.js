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
import PokeDex from "./components/PokeDex";
import Tasks from "./components/Tasks";

const TASKS_PORT = 4001;

const ratesClient = new ApolloClient({
  uri: 'https://48p1r2roz4.sse.codesandbox.io', // uri specifies the URL of our GraphQL server.
  cache: new InMemoryCache() // cache is an instance of InMemoryCache, which Apollo Client uses to cache query results after fetching them.
});
const pokeClient = new ApolloClient({
  uri: 'https://dex-server.herokuapp.com/',
  cache: new InMemoryCache()
});
const taskClient = new ApolloClient({
  uri: `http://localhost:${TASKS_PORT}/`,
  cache: new InMemoryCache()
});

function App() {
  return (
    <Router>
      <div className="App">
        <div className="navbar">
          <Link to="/Rates">EXCHANGE RATES</Link>
          <Link to="/Poke">POKEMON</Link>
          <Link to="/Tasks">TASKS</Link>
          <Link to="/Other">OTHER</Link>
        </div>

        <div className="main-container" >
        <Switch>

          <Route path="/Rates">
            <ApolloProvider client={ratesClient}>
              <ExchangeRates />
            </ApolloProvider>
          </Route>

          <Route path="/Poke">
            <ApolloProvider client={pokeClient}>
              <PokeDex />
            </ApolloProvider>
          </Route>

          <Route path="/Tasks">
            <ApolloProvider client={taskClient}>
              <Tasks />
            </ApolloProvider>
          </Route>

          <Route path="/Other">
            <h1>WIP</h1>
          </Route>

        </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
