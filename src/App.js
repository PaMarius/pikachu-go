import { useEffect, useState } from "react";
import EndGamePage from "./components/EndGamePage";
import { PokemonList } from "./components/PokemonList";
import StartPage from "./components/StartPage";

function App() {
  const [page, setPage] = useState(0);

  const [points, setPoints] = useState({ userPoints: 0, computerPoints: 0 });

  function changePage() {
    switch (page) {
      case 0:
        return <StartPage setPage={setPage} />;
      case 1:
        return (
          <PokemonList
            points={points}
            setPoints={setPoints}
            setPage={setPage}
          />
        );

      case 2:
        return (
          <EndGamePage
            points={points}
            setPage={setPage}
            setPoints={setPoints}
          />
        );
    }
  }

  return changePage();
}

export default App;
