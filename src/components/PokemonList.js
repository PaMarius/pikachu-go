import { useEffect, useState } from "react";

export const PokemonList = () => {
  const [pokemonList, setPokemonList] = useState([]);

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

  const pokemon1 = pokemonList[7];
  const pokemon2 = pokemonList[19];
  console.log(pokemon1, pokemon2);

  const chooseWinner = (pokemon1, pokemon2) => {};

  return <div>Hello</div>;
};
