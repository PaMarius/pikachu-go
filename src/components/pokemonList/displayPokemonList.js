import React, { useState, useEffect, useRef } from "react";
import "./pokemonList.css";

function DisplayPokemonList({ changePage }) {
  const [pokemonData, setPokemonData] = useState([]);
  const offset = useRef(0);

  async function getPokemon() {
    const fetchData = await fetch(
      `https://pokeapi.co/api/v2/pokemon/?limit=20&offset=${offset.current}`
    );
    const { results } = await fetchData.json();

    const pokemonArr = await Promise.all(
      results.map(async (item) => {
        const fetchPokemon = await fetch(item.url);
        const result = await fetchPokemon.json();
        return result;
      })
    );

    setPokemonData((preValue) => {
      const arr = [...preValue, ...pokemonArr];
      const ids = arr.map((item) => item.id);
      const filter = arr.filter(
        ({ id }, index) => !ids.includes(id, index + 1)
      );
      return filter;
    });
  }

  function handleScroll(e) {
    if (
      window.innerHeight + e.target.documentElement.scrollTop >=
      e.target.documentElement.scrollHeight
    ) {
      offset.current += 20;
      getPokemon();
    }
  }

  useEffect(() => {
    getPokemon();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <div className="close">
        <img
          src={"./back-arrow.svg"}
          className="arrow"
          onClick={() => changePage(0)}
        />
      </div>
      <img className="pokemon-logo" src="./pokemonLogo.png" />
      {pokemonData.length > 0 ? (
        <div className="pokemon-container">
          {pokemonData.map(({ id, types, sprites, name }) => {
            return (
              <div key={id} className="pokemon-card">
                <div className="pokemon-appearance">
                  <div className={`pokemon-img ${types[0].type.name}`}></div>
                  <img
                    className="img"
                    src={sprites.other["dream_world"]["front_default"]}
                  />
                </div>
                <div className="pokemon-name">{name.toUpperCase()}</div>
                <div className="pokemon-types">
                  {types.map((type, index) => {
                    return (
                      <div key={index} className={`type ${type.type.name}`}>
                        {type.type.name.toUpperCase()}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      ) : null}
    </>
  );
}

export default DisplayPokemonList;
