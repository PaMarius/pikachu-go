import { useEffect, useState } from "react";
import { PokemonList } from "./components/PokemonList";
import StartPage from "./components/StartPage";

function App() {
  const [page, setPage] = useState(0);

  function changePage() {
    switch (page) {
      case 0:
        return <StartPage setPage={setPage} />;
      case 1:
        return <PokemonList />;
      case 2:
        return <></>;
    }
  }

  return changePage();
}

export default App;
