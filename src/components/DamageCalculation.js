import { pokemonTypes } from "../constants/pokemonTypes";

const calculateDamage = (pokemonTypes1, pokemonTypes2) => {
  let dmgPokemon1;
  let dmgPokemon2;
  // Calculating DAMAGE for Pokemon1
  let arrayOfdmgPokemon1 = [];
  for (const typesPokemon1 of pokemonTypes1) {
    let dmg = [];
    for (const typesPokemon2 of pokemonTypes2) {
      const objectValue = pokemonTypes.find((objectOfTypes) => {
        return objectOfTypes.hasOwnProperty(typesPokemon1);
      });
      dmg.push(objectValue[typesPokemon1][typesPokemon2]);
    }
    dmg.length == 1
      ? arrayOfdmgPokemon1.push(dmg[0])
      : arrayOfdmgPokemon1.push(dmg[0] * dmg[1]);
  }
  dmgPokemon1 =
    arrayOfdmgPokemon1.reduce((a, b) => a + b, 0) / arrayOfdmgPokemon1.length;

  // Calculating DAMAGE for Pokemon2
  let arrayOfdmgPokemon2 = [];
  for (const typesPokemon2 of pokemonTypes2) {
    let dmg = [];
    for (const typesPokemon1 of pokemonTypes1) {
      const objectValue = pokemonTypes.find((objectOfTypes) => {
        return objectOfTypes.hasOwnProperty(typesPokemon2);
      });
      dmg.push(objectValue[typesPokemon2][typesPokemon1]);
    }
    dmg.length == 1
      ? arrayOfdmgPokemon2.push(dmg[0])
      : arrayOfdmgPokemon2.push(dmg[0] * dmg[1]);
  }
  dmgPokemon2 =
    arrayOfdmgPokemon2.reduce((a, b) => a + b, 0) / arrayOfdmgPokemon2.length;
  return [dmgPokemon1, dmgPokemon2];
};

export const handleDamage = (pokemonList, setWinner) => {
  const userChoice = pokemonList[0].types.map((item) => item.type.name);
  const computerChoice = pokemonList[1].types.map((item) => item.type.name);
  const [dmgPokemon1, dmgPokemon2] = calculateDamage(
    userChoice,
    computerChoice
  );
  if (dmgPokemon1 > dmgPokemon2) {
    setWinner("win");
  } else if (dmgPokemon1 == dmgPokemon2) {
    const xpPokemon1 = pokemonList[0]["base_experience"];
    const xpPokemon2 = pokemonList[1]["base_experience"];
    if (xpPokemon1 > xpPokemon2) {
      setWinner("win");
    } else if (xpPokemon1 == xpPokemon2) {
      setWinner("draw");
    } else {
      setWinner("lose");
    }
  } else {
    setWinner("lose");
  }
};
