import { useState, useEffect } from "react";
import "./double-points.css";

export const DoublePoints = () => {
  const [pokemon, setPokemon] = useState({});

  async function getData() {
    const pokemon = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${Math.floor(Math.random() * 151)}`
    );
    const result = await pokemon.json();
    setPokemon(result);
  }

  useEffect(() => {
    getData();
  }, []);

  console.log(pokemon);

  return (
    <div className="modal">
      <div className="white-container">
        <p className="title">Want a chance to double your points?</p>
        <p>Guess the name of the pokemon down below</p>
        <img src={pokemon.sprites.other["dream_world"]["front_default"]} />
      </div>
    </div>
  );
};
