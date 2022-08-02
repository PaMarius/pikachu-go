import { useEffect, useState } from "react";
import { pokemonTypes } from "../constants/pokemonTypes";
import { PokemonCard } from "./PokemonCard";
import "./PokemonRandom.scss";
import calculateDamage from "../constants/calculateDamage";

export const PokemonRandom = ({ setPage, points, setPoints }) => {
  const [pokemonList, setPokemonList] = useState([]);
  async function getData() {
    const result = await Promise.all(
      [0, 1].map(async (item) => {
        const pokemon = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${Math.floor(Math.random() * 151)}`
        );
        const result = await pokemon.json();
        return result;
      })
    );
    setPokemonList([...result]);
  }

  useEffect(() => {
    getData();
  }, []);

  async function fetchType(pokemon) {
    const data = await Promise.all(
      pokemon.map(async (item) => {
        const fetchData = await fetch(`https://pokeapi.co/api/v2/type/${item}`);
        const result = await fetchData.json();
        return result;
      })
    );
    return data;
  }

  async function handleClick(buttonVal) {
    const userChoice = pokemonList[0].types.map((item) => item.type.name);
    const computerChoice = pokemonList[1].types.map((item) => item.type.name);
    const fetchPokemonType1 = await fetchType(userChoice);
    const fetchPokemonType2 = await fetchType(computerChoice);

    const userDamage = calculateDamage(
      userChoice,
      computerChoice,
      fetchPokemonType1
    );
    const computerDamage = calculateDamage(
      computerChoice,
      userChoice,
      fetchPokemonType2
    );

    if (userDamage === computerDamage) {
      const userPokemon = pokemonList[0].base_experience;
      const computerPokemon = pokemonList[1].base_experience;
      if (
        (userPokemon > computerPokemon && buttonVal === "win") ||
        (buttonVal === "draw" && userPokemon === computerPokemon)
      ) {
        setPoints({
          userPoints: points.userPoints + 1,
          computerPoints: points.computerPoints,
        });
      } else if (userPokemon < computerPokemon && buttonVal === "lose") {
        setPoints({
          userPoints: points.userPoints + 1,
          computerPoints: points.computerPoints,
        });
      } else {
        setPoints({
          userPoints: points.userPoints,
          computerPoints: points.computerPoints + 1,
        });
      }
    } else if (userDamage > computerDamage && buttonVal === "win") {
      setPoints({
        userPoints: points.userPoints + 1,
        computerPoints: points.computerPoints,
      });
    } else if (userDamage < computerDamage && buttonVal === "lose") {
      setPoints({
        userPoints: points.userPoints + 1,
        computerPoints: points.computerPoints,
      });
    } else {
      setPoints({
        userPoints: points.userPoints,
        computerPoints: points.computerPoints + 1,
      });
    }
    getData();
  }

  return (
    <>
      <div className="container2">
        <div className="show-score">Your score: {points.userPoints} POINTS</div>
        <div className="cards">
          {pokemonList.length > 0 &&
            pokemonList.map((pokemon, index) => {
              return <PokemonCard key={index} pokemon={pokemon} />;
            })}
        </div>
        <div className="filling-space2"></div>
        <div className="buttons">
          <div
            onClick={() => {
              handleClick("win");
            }}
            className="win-bttn"
          >
            WIN
          </div>
          <div
            onClick={() => {
              handleClick("draw");
            }}
            className="draw-bttn"
          >
            DRAW
          </div>
          <div
            onClick={() => {
              handleClick("lose");
            }}
            className="lose-bttn"
          >
            LOSE
          </div>
          {points.userPoints + points.computerPoints >= 3 ? (
            <button onClick={() => setPage(2)}>End game</button>
          ) : null}
        </div>
      </div>
    </>
  );
};
