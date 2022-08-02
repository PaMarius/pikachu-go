import { useEffect, useState } from "react";
import { pokemonTypes } from "../constants/pokemonTypes";
import calculateDamage from "../constants/calculateDamage";

export const PokemonList = ({ points, setPoints, setPage }) => {
  const [choice, setChoice] = useState([]);

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
    setChoice([...result]);
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
    const userChoice = choice[0].types.map((item) => item.type.name);
    const computerChoice = choice[1].types.map((item) => item.type.name);
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
      const userPokemon = choice[0];
      const computerPokemon = choice[1];
      if (userPokemon.base_experience > computerPokemon.base_experience) {
        if (buttonVal === "win") {
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
        return;
      } else if (
        userPokemon.base_experience < computerPokemon.base_experience
      ) {
        if (buttonVal === "lose") {
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
        return;
      } else {
        if (buttonVal === "draw") {
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
        return;
      }
    }
    if (userDamage > computerDamage) {
      if (buttonVal === "win") {
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
    } else {
      if (buttonVal === "lose") {
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
    }
    getData();
  }
  return choice.length > 1 ? (
    <div style={{ display: "flex" }}>
      {choice.map((item, index) => {
        return (
          <div
            style={{
              border: "1px solid black",
              margin: "10px",
              width: "300px",
              height: "300px",
            }}
            key={index}
          >
            {item?.name}
          </div>
        );
      })}
      <div style={{ display: "flex", alignItems: "center" }}>
        <button
          onClick={() => {
            handleClick("win");
          }}
        >
          win
        </button>
        <button
          onClick={() => {
            handleClick("draw");
          }}
        >
          draw
        </button>
        <button
          onClick={() => {
            handleClick("lose");
          }}
        >
          lose
        </button>

        {points.userPoints + points.computerPoints >= 3 ? (
          <button onClick={() => setPage(2)}>End game</button>
        ) : null}
      </div>
      <p>user:{points.userPoints}</p>
      <p>computer:{points.computerPoints}</p>
    </div>
  ) : null;
};
