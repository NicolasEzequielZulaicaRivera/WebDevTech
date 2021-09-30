
import { useQuery, useLazyQuery , gql } from "@apollo/client";
import '../styles/poke.css'

const GET_ALL_POKE = gql`
query allPoke {
    allPokemon {
      id
      name
    }
  }
`;

const GET_POKE = gql`
query getPoke($pokemonId: Int = 1) {
    pokemon(id: $pokemonId) {
      id
      name
      weight
      height
      base_stats {
        hp
        attack
        defense
      }
      sprites {
        front_default
      }
    }
  }
`;

const GET_POKE_SKILLS = gql`
query getPokeSkills($pokemonId: Int = 1) {
    pokemon(id: $pokemonId) {
      abilities {
        id
        name
        description
      }
    }
  }
`;

const PokeSkills = ({pokemonId}) => {

    const [ getSkills, { data } ] = useLazyQuery(GET_POKE_SKILLS);
    
    return data?
        data.pokemon.abilities.map( ({id,name,description}) =>
            <div className="poke-skill-name" 
                key={id} title={description} 
            >
                {name}
            </div>
        )
    :
        <button id="poke-skill-btn"
            onClick={ ()=>{ getSkills({ variables: {pokemonId: pokemonId} }) } }
        > SHOW </button>

}

const FeaturedPokemon = ({ pokeState }) => {
    const { loading, error, data } = pokeState;

    const body = 
    loading ? <p>Loading...</p> :
    error ? <p>Error</p> :
    !data ? <p>Select Pokemon</p> :
    <>
        <h4>{data?.pokemon?.name}</h4>
        <img src={data?.pokemon?.sprites?.front_default} alt={data?.pokemon?.name + " image"} />


        <div className="poke-data-title"><b>Base Stats</b></div>

        <div className="poke-data">
            <b>HP: </b>{data?.pokemon?.base_stats?.hp}
        </div>
        <div className="poke-data">
            <b>ATK: </b>{data?.pokemon?.base_stats?.attack}
        </div>
        <div className="poke-data">
            <b>DEF: </b>{data?.pokemon?.base_stats?.defense}
        </div>

        <br/><hr/><br/>
        
        <div className="poke-data-title"><b>Other Stats</b></div>

        <div className="poke-data">
            <b>Weight: </b>{data?.pokemon?.weight}
        </div>
        <div className="poke-data">
            <b>Height: </b>{data?.pokemon?.height}
        </div>

        <br/><hr/><br/>

        <div className="poke-data-title"><b>Skills</b></div>

        <PokeSkills pokemonId={data?.pokemon?.id} />
    </>

    return <div className="featured">{body}</div>;
}

const PokeDex = () => {


    const { loading, error, data } = useQuery(GET_ALL_POKE);
    const [ getPoke, pokeState ] = useLazyQuery(GET_POKE);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;

    return (
        <div className="PokeDex">
            <div className="title">
                POKEDEX
            </div>
            <div className="container" >
                <FeaturedPokemon  pokeState={pokeState} />
                <div className="main">
                {
                    data.allPokemon.map( ({ id, name }) => (
                        <div key={id} 
                            className="pokemon"
                            onClick={ () =>{ getPoke({ variables: {pokemonId: id} }) }  }
                        >
                            {name}
                        </div>
                    ))
                }
                </div>
            </div>
        </div>
    );

}

export default PokeDex;