import { useEffect, useState } from "react";
import { pokemonTypes } from "../constants/pokemonTypes";

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

  console.log(choice);
  async function handleClick(buttonVal) {
    if (buttonVal) {
      const userChoice = choice[0].types.map((item) => item.type.name);
      const computerChoice = choice[1].types.map((item) => item.type.name);
      const fetchPokemonType1 = await fetchType(userChoice);
      const fetchPokemonType2 = await fetchType(computerChoice);

      function calculateDamage(pokemonTypes1, pokemonTypes2, pokemonDataTypes) {
        let result = 0;
        for (let type1 of pokemonTypes1) {
          let prod = 1;
          for (let type2 of pokemonTypes2) {
            const index = pokemonDataTypes.find(
              (item) => item.name === type1
            ).damage_relations;
            if (index.double_damage_to.find((item) => item.name === type2)) {
              prod *= 2;
            } else if (
              index.half_damage_to.find((item) => item.name === type2)
            ) {
              prod *= 0.5;
            } else if (index.no_damage_to.find((item) => item.name === type2)) {
              prod *= 0;
            } else {
              prod *= 1;
            }
          }
          result += prod;
        }
        return result / pokemonTypes1.length;
      }
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
      console.log(userDamage, "userDamage");
      console.log(computerDamage, "computerDamage");

      if (userDamage === computerDamage) {
        const userPokemon = choice[0];
        const computerPokemon = choice[1];
        if (userPokemon.base_experience > computerPokemon.base_experience) {
          console.log("case1");
          if (buttonVal === "win") {
            console.log("you win");
            setPoints({
              userPoints: points.userPoints + 1,
              computerPoints: points.computerPoints,
            });
          } else {
            console.log("you lose");
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
          console.log("case2");
          if (buttonVal === "lose") {
            console.log("you win");
            setPoints({
              userPoints: points.userPoints + 1,
              computerPoints: points.computerPoints,
            });
          } else {
            console.log("you lose");
            setPoints({
              userPoints: points.userPoints,
              computerPoints: points.computerPoints + 1,
            });
          }
          getData();
          return;
        } else {
          console.log("case3");
          if (buttonVal === "draw") {
            console.log("you win draw");
            setPoints({
              userPoints: points.userPoints + 1,
              computerPoints: points.computerPoints,
            });
          } else {
            console.log("you lose");
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
        console.log("case4");
        if (buttonVal === "win") {
          console.log("you win");
          setPoints({
            userPoints: points.userPoints + 1,
            computerPoints: points.computerPoints,
          });
        } else {
          console.log("you lose");
          setPoints({
            userPoints: points.userPoints,
            computerPoints: points.computerPoints + 1,
          });
        }
      } else {
        console.log("case5");
        if (buttonVal === "lose") {
          setPoints({
            userPoints: points.userPoints + 1,
            computerPoints: points.computerPoints,
          });
          console.log("you win");
        } else {
          console.log("you lose");
          setPoints({
            userPoints: points.userPoints,
            computerPoints: points.computerPoints + 1,
          });
        }
      }
      getData();
    }
  }
  return choice.length > 1 ? (
    <div style={{ display: "flex" }}>
      {choice.map((item, index) => {
        return (
          <div
            onClick={() => handleClick(item)}
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
