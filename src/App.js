import { useEffect, useState } from "react";
import { PokemonList } from "./components/PokemonList";
import { PokemonCard } from "./components/PokemonCard";
import { pokemonTypes } from "./constants/pokemonTypes";
import { FinalPage } from "./components/final page/FinalPage";

function App() {
  return (
    <div>
      <FinalPage />
    </div>
  );
}

export default App;
