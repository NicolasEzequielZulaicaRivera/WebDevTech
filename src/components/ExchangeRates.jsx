
import { useState } from "react";
import { useQuery, gql } from "@apollo/client";


/* Plain JS querry
ratesClient // this client is defined in App
  .query({
    query: gql`
      query GetRates {
        rates(currency: "USD") {
          currency
        }
      }
    `
  })
  .then(result => console.log(result));
*/

const USD_EXCHANGE_RATES_QUERY = gql`
query GetExchangeRates ( $currency: String! ) {
  rates(currency: $currency) {
    currency
    rate
  }
}
`;

const ExchangeRates = () => {

    const [currency, setCurrency] = useState("USD");
    const changeCurrency = () => {
        if (currency === "USD") setCurrency("ARS")
        else setCurrency("USD")
    }

    const { loading, error, data } = useQuery(USD_EXCHANGE_RATES_QUERY, { variables: { currency } } );

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;

    return (
        <div className="ExchangeRates">
            <h3>
                <span onClick={changeCurrency} >{currency.toUpperCase()} </span>
                EXCHANGE RATES
            </h3>
            {
                data.rates.map( ({ currency, rate }) => (
                    <div key={currency}>
                        <p>
                        {currency}: {rate}
                        </p>
                    </div>
                ))
            }
        </div>
    );

}

export default ExchangeRates;