import "./pokemonCard.css";
import "./pokemonsTypeColor.css";

export const PokemonCard = ({ pokemon }) => {
  const style = `pokemon-img ${pokemon.types[0].type.name}`;
  const styleForType = `type ${pokemon.types[0].type.name}`;
  return (
    <div className="pokemon-card">
      <div className="pokemon-appearance">
        <div className={style}></div>
        <img
          className="img"
          src={pokemon.sprites.other["dream_world"]["front_default"]}
        />
      </div>
      <div className="pokemon-name">{pokemon.name.toUpperCase()}</div>
      <div className="pokemon-types">
        {pokemon.types.map((type, index) => {
          return (
            <div key={index} className={styleForType}>
              {type.type.name.toUpperCase()}
            </div>
          );
        })}
      </div>
    </div>
  );
};
