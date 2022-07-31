import { useEffect, useState } from "react";
import { PokemonList } from "./components/PokemonList";
import { PokemonCard } from "./components/PokemonCard";
import { pokemonTypes } from "./constants/pokemonTypes";

function App() {
  return (
    <div>
      <PokemonCard />
    </div>
  );
}

export default App;
