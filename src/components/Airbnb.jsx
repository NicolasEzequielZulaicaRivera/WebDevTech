
import { useQuery, gql } from "@apollo/client";
import "../styles/airbnb.css";


const LISTINGS = gql`
query listings{
    listingsAndReview {
        _id
        name
        summary
    }
}
`;

const Airbnb = () => {


    const { loading, error, data } = useQuery(LISTINGS);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;

    return (
        <div className="Airbnb">
            <div className="title">
                AIRBNB
            </div>
            {
                data.listingsAndReview.map( ({ _id, name, summary }) => (
                    <div key={_id} className="rate">
                        {name}
                    </div>
                ))
            }
        </div>
    );

}

export default Airbnb;