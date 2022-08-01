import { useEffect, useState } from "react";
import { PokemonList } from "./components/PokemonList";
import { PokemonCard } from "./components/PokemonCard";
import { pokemonTypes } from "./constants/pokemonTypes";
import { FinalPage } from "./components/final page/FinalPage";
import {StartPage} from "./components/StartPage";

function App() {
  const [page, setPage] = useState(0);

  function changePage() {
    switch (page) {
      case 0:
        return <StartPage setPage={setPage} />;
      case 1:
        return <PokemonList />;
      case 2:
        return <FinalPage />;
    }
  }

  return changePage();

}

export default App;
