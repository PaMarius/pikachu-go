function calculateDamage(pokemonTypes1, pokemonTypes2, pokemonDataTypes) {
  let result = 0;
  for (let type1 of pokemonTypes1) {
    let prod = 1;
    for (let type2 of pokemonTypes2) {
      const index = pokemonDataTypes.find(
        (item) => item.name === type1
      ).damage_relations;
      if (index.double_damage_to.find((item) => item.name === type2)) {
        prod *= 2;
      } else if (index.half_damage_to.find((item) => item.name === type2)) {
        prod *= 0.5;
      } else if (index.no_damage_to.find((item) => item.name === type2)) {
        prod *= 0;
      } else {
        prod *= 1;
      }
    }
    result += prod;
  }
  return result / pokemonTypes1.length;
}

export default calculateDamage;
