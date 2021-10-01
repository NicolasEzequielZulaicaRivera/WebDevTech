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
  createHttpLink,
} from "@apollo/client";

import ExchangeRates from "./components/ExchangeRates";
import PokeDex from "./components/PokeDex";
import Tasks from "./components/Tasks";
import RickAndMorty from "./components/RickAndMorty";
import Airbnb from "./components/Airbnb";

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
const airbnbLink = createHttpLink({
  uri: 'https://us-east-1.aws.realm.mongodb.com/api/client/v2.0/app/airbnb-adcso/graphql',
  headers: {
    "email": "admin",
    "password": "86yZQD2Ihw8v8OHa",
  }
});
const airbnbClient = new ApolloClient({
  cache: new InMemoryCache(),
  link: airbnbLink
});

function App() {
  return (
    <Router>
      <div className="App">
        <div className="navbar">
          <Link to="/Rates">EXCHANGE RATES</Link>
          <Link to="/Poke">POKEMON</Link>
          <Link to="/Tasks">TASKS</Link>
          <Link to="/RickAndMorty">RICK & MORTY</Link>
          <Link to="/Airbnb">AIRBNB</Link>
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

          <Route path="/RickAndMorty">
            <ApolloProvider client={ratesClient}>
              <RickAndMorty />
            </ApolloProvider>
          </Route>

          <Route path="/Airbnb">
            <ApolloProvider client={airbnbClient}>
              <Airbnb />
            </ApolloProvider>
          </Route>

        </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
