import { useEffect, useState } from "react";
import { PokemonCard } from "./PokemonCard";
import "./PokemonRandom.scss";
import calculateDamage from "../constants/calculateDamage";
import { DoublePoints } from "./double points/DoublePoints";
import compareDamage from "../constants/compareDamage";

export const PokemonRandom = ({ setPage, points, setPoints }) => {
  const [pokemonList, setPokemonList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(3);
  setTimeout(() => {
    setTimer(timer - 1);
    setTimeout(() => {
      setLoading(true);
    }, 2000);
  }, 1000);
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

    compareDamage({
      userDamage,
      computerDamage,
      pokemonList,
      points,
      setPoints,
      buttonVal,
    });
    getData();
  }

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const endGameHandler = () => {
    setModalIsOpen(true);
  };
  const closeModalHandler = () => {
    setPage(2);
  };

  return (
    <>
      <div className="container2">
        {loading ? (
          <div>
            <div className="show-score">
              Your score: {points.userPoints} POINTS
            </div>
            <div className="cards">
              {pokemonList.length > 0 &&
                pokemonList.map((pokemon, index) => {
                  return <PokemonCard key={index} pokemon={pokemon} />;
                })}
            </div>
            <div className="filling-space"></div>
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
                <button onClick={endGameHandler} className="end-bttn">
                  END GAME
                </button>
              ) : null}
            </div>
          </div>
        ) : (
          <div className="timer">{timer}</div>
        )}

        {modalIsOpen && (
          <DoublePoints
            onClick={closeModalHandler}
            userPoints={points.userPoints}
            setPoints={setPoints}
            setPage={setPage}
          />
        )}
      </div>
    </>
  );
};
