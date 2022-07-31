import { useEffect, useState } from "react";
import { pokemonTypes } from "../constants/pokemonTypes";

export const PokemonList = () => {
  const [pokemonList, setPokemonList] = useState([]);
  const [playerScore, setPlayerScore] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const apiURL = "https://pokeapi.co/api/v2/pokemon?limit=20";
      const res = await fetch(apiURL);
      const { results } = await res.json();

      const parsedPokemon = await Promise.all(
        results.map(async (pokemon, index) => {
          const specificPokemon = await fetch(pokemon.url);
          const parsedPokemon = await specificPokemon.json();
          return { ...parsedPokemon };
        })
      );
      setPokemonList(parsedPokemon);
    };
    fetchData();
  }, []);

  const chooseWinner = () => {
    const pokemon1 = pokemonList[7];
    const pokemon2 = pokemonList[2];

    const typePokemon1 = pokemon1.types.map((type) => {
      return type.type.name;
    });

    const typePokemon2 = pokemon2.types.map((type) => {
      return type.type.name;
    });

    let damage1 = 0;
    let damage2 = 0;

    console.log(typePokemon1, typePokemon2);

    function calculateDamage(typePokemon1, typePokemon2) {
      let damage = 0;
      for (let type1 of typePokemon1) {
        for (let type2 of typePokemon2) {
          const foundDamageValue = pokemonTypes.find((element) => {
            return element.hasOwnProperty(type1);
          })[`${type1}`][`${type2}`];

          damage += foundDamageValue;
        }
        damage = damage / typePokemon2.length;
      }
      return damage;
    }

    damage1 = calculateDamage(typePokemon1, typePokemon2);
    damage2 = calculateDamage(typePokemon2, typePokemon1);

    console.log(damage1);
    console.log(damage2);

    // if (damage1 > damage2) {
    //   return;
    // }

    setPlayerScore(playerScore + 1);
    console.log(playerScore);
  };

  return (
    <div>
      {pokemonList.map((pokemon) => {
        return <div onClick={chooseWinner}>{pokemon.name}</div>;
      })}
    </div>
  );
};
