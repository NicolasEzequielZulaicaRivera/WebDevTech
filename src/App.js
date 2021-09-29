import './App.css';
import { useQuery, gql } from "@apollo/client";

const USD_EXCHANGE_RATES_QUERY = gql`
  query GetExchangeRates {
    rates(currency: "USD") {
      currency
      rate
    }
  }
`;

const ExchangeRates = () => {
  const { loading, error, data } = useQuery(USD_EXCHANGE_RATES_QUERY);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return data.rates.map(({ currency, rate }) => (
    <div key={currency}>
      <p>
        {currency}: {rate}
      </p>
    </div>
  ));
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h3>USD EXCHANGE RATES</h3>
        <ExchangeRates />
      </header>
    </div>
  );
}

export default App;
