function compareDamage({
  userDamage,
  computerDamage,
  pokemonList,
  points,
  setPoints,
  buttonVal,
}) {
  if (userDamage === computerDamage) {
    const userPokemon = pokemonList[0].base_experience;
    const computerPokemon = pokemonList[1].base_experience;
    if (
      (userPokemon > computerPokemon && buttonVal === "win") ||
      (buttonVal === "draw" && userPokemon === computerPokemon)
    ) {
      setPoints({
        userPoints: points.userPoints + 1,
        computerPoints: points.computerPoints,
      });
    } else if (userPokemon < computerPokemon && buttonVal === "lose") {
      setPoints({
        userPoints: points.userPoints + 1,
        computerPoints: points.computerPoints,
      });
    } else {
      setPoints({
        userPoints: points.userPoints,
        computerPoints: points.computerPoints + 1,
      });
    }
  } else if (userDamage > computerDamage && buttonVal === "win") {
    setPoints({
      userPoints: points.userPoints + 1,
      computerPoints: points.computerPoints,
    });
  } else if (userDamage < computerDamage && buttonVal === "lose") {
    setPoints({
      userPoints: points.userPoints + 1,
      computerPoints: points.computerPoints,
    });
  } else {
    setPoints({
      userPoints: points.userPoints,
      computerPoints: points.computerPoints + 1,
    });
  }
}

export default compareDamage;
