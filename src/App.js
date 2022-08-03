import { useEffect, useState } from "react";
import { PokemonCard } from "./components/PokemonCard";
import { FinalPage } from "./components/final page/FinalPage";
import StartPage from "./components/StartPage";
import { PokemonRandom } from "./components/PokemonRandom";
import { NavBar } from "./components/NavBar";

function App() {
  const [page, setPage] = useState(0);
  const [points, setPoints] = useState({ userPoints: 0, computerPoints: 0 });

  function changePage() {
    switch (page) {
      case 0:
        return <StartPage setPage={setPage} />;
      case 1:
        return (
          <PokemonRandom
            setPage={setPage}
            points={points}
            setPoints={setPoints}
          />
        );
      case 2:
        return (
          <FinalPage setPage={setPage} points={points} setPoints={setPoints} />
        );
      // Doar pentru test - puteti modifica cu orice alta componenta
      case 3:
        return (
          <FinalPage setPage={setPage} points={points} setPoints={setPoints} />
        );
    }
  }

  return changePage();
}

export default App;
