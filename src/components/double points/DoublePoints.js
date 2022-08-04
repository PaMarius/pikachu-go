import { useState, useEffect } from "react";
import "./double-points.css";

export const DoublePoints = (props) => {
  const { onClick, userPoints, setPoints, setPage } = props;
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

  function isEmpty(obj) {
    for (var prop in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, prop)) {
        return false;
      }
    }
    return JSON.stringify(obj) === JSON.stringify({});
  }

  const [userInput, setUserInput] = useState("");

  const handleChange = (event) => {
    setUserInput(event.target.value);
  };

  const checkGuess = () => {
    if (userInput.toLocaleLowerCase() == pokemon.name) {
      setPoints({ userPoints: userPoints * 2 });
      setPage(2);
    } else {
      setPage(2);
    }
  };

  if (!isEmpty(pokemon)) {
    console.log(pokemon.name);
    return (
      <div className="modal">
        <div className="white-container">
          <img src={"./x.svg"} className="x" onClick={onClick} />
          <p className="title">Want a chance to double your points?</p>
          <p className="comment">Guess the name of the pokemon down below</p>
          <img
            className="hidden-pokemon"
            src={pokemon.sprites.other["dream_world"]["front_default"]}
          />
          <div className="guess-container">
            <input
              type="text"
              id="userInput"
              name="userInput"
              onChange={handleChange}
              value={userInput}
            />
            <button className="guess-btn" onClick={checkGuess}>
              Guess
            </button>
          </div>
        </div>
      </div>
    );
  }
};
