
import { useQuery, gql } from "@apollo/client";
import "../styles/rick-and-morty.css";


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
query GetRickAndMorty ( $currency: String! ) {
  rates(currency: $currency) {
    currency
    rate
  }
}
`;

const RickAndMorty = () => {


    const { loading, error, data } = useQuery(USD_EXCHANGE_RATES_QUERY, { variables: { currency: "USD" } } );

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;

    return (
        <div className="RickAndMorty">
            <div className="title">
                Rick And Morty
            </div>
            {
                data.rates.map( ({ currency, rate }) => (
                    <div key={currency} className="rate">
                        {currency}: {rate}
                    </div>
                ))
            }
        </div>
    );

}

export default RickAndMorty;