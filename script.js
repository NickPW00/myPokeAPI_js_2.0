const pokemonPromises = [];

const fetchPokemon = () => {
    const getPokemonUrl = id =>`https://pokeapi.co/api/v2/pokemon/${id}`
    
    for(let i = 1; i <= 151; i++){
        pokemonPromises.push(fetch(getPokemonUrl(i)).then(response => response.json()))
    };

    Promise.all(pokemonPromises)
        .then(pokemons => {
            console.log(pokemons[0])
            pokemons.forEach(
                pokemon => {
                    console.log(pokemon.name , "/",
                                pokemon.id, "/",
                                pokemon.types.map(typeInfo => typeInfo.type.name).join(" | "), "/",
                                pokemon.abilities.map(abilInfo => abilInfo.ability.name).join(" | "), "/",
                                pokemon.stats.map(a => a.base_stat).join(" | ")) 
                    /* pokemon.types.forEach(a => console.log(pokemon.name, a.type.name)) */
                })
        })
}

fetchPokemon()

