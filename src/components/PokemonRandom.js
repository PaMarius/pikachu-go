import { useEffect, useState } from "react";
import { pokemonTypes } from "../constants/pokemonTypes";
import { PokemonCard } from "./PokemonCard";
import "./PokemonRandom.scss";
import { handleDamage } from "./DamageCalculation";

export const PokemonRandom = ({ setPage }) => {
  const [pokemonList, setPokemonList] = useState([]);
  const [click, setClick] = useState(0);
  const [choice, setChoice] = useState("");
  const [handleChoice, setHandleChoice] = useState(0);
  const [winner, setWinner] = useState("");

  async function getPokemon() {
    const result = await Promise.all(
      [0, 1].map(async (item) => {
        const randomPokemon = Math.floor(Math.random() * 151);
        const url = `https://pokeapi.co/api/v2/pokemon/${randomPokemon}`;
        const fetchData = await fetch(url);
        const result = await fetchData.json();
        return result;
      })
    );
    setPokemonList(result);
  }

  useEffect(() => {
    getPokemon();
    if (handleChoice >= 3) {
      if (choice === "win" && winner === "win") {
        setHandleChoice(handleChoice + 1);
      } else if (choice === "draw" && winner === "draw") {
        setHandleChoice(handleChoice + 1);
      } else if (choice === "lose" && winner === "lose") {
        setHandleChoice(handleChoice + 1);
      } else {
        setPage(0);
      }
    } else {
      if (choice === "win" && winner === "win") {
        setHandleChoice(handleChoice + 1);
      } else if (choice === "draw" && winner === "draw") {
        setHandleChoice(handleChoice + 1);
      } else if (choice === "lose" && winner === "lose") {
        setHandleChoice(handleChoice + 1);
      }
    }
  }, [click]);

  const handleClick = () => {
    setClick(click + 1);
  };

  return (
    <>
      <div className="container2">
        <div className="filling-space1">{handleChoice} POINTS</div>
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
              handleClick();
              handleDamage(pokemonList, setWinner);
              setChoice("win");
            }}
            className="win-bttn"
          >
            WIN
          </div>
          <div
            onClick={() => {
              handleClick();
              handleDamage(pokemonList, setWinner);
              setChoice("draw");
            }}
            className="draw-bttn"
          >
            DRAW
          </div>
          <div
            onClick={() => {
              handleClick();
              handleDamage(pokemonList, setWinner);
              setChoice("lose");
            }}
            className="lose-bttn"
          >
            LOSE
          </div>
        </div>
      </div>
    </>
  );
};
