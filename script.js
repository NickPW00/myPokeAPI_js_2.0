const pokemonPromises = [];
let body = document.querySelector("body");
let conjuntoCards = document.querySelector("#conjuntoCards");

const fetchPokemon = () => {
    const getPokemonUrl = id =>`https://pokeapi.co/api/v2/pokemon/${id}`
    
    for(let i = 1; i <= 1010; i++){
        pokemonPromises.push(fetch(getPokemonUrl(i)).then(response => response.json()))
    };

    Promise.all(pokemonPromises)
        .then(pokemons => {
            console.log(pokemons[0], `https://pokeapi.co/api/v2/pokemon-species/0/`)
            let cardsPokemon = pokemons.reduce((accumulator, {name, id, types, abilities, stats}) => {
                let tipos = types.map(typeInfo => typeInfo.type.name).join(" | ");
                let imagem = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`; ''
                let habilidades = abilities.map(abilInfo => abilInfo.ability.name).join(" | ");
                let estatisticas = stats.map(a => a.base_stat).join(" | ");
                accumulator += 
                `
                <div class="card">
                    <img src=${imagem}>
                    <p>${id}. ${name}</p>
                    <p>${tipos}</p>
                    <p>${habilidades}</p>
                    <p>${estatisticas}</p>
                    <p></p>
                </div>
                `
                return accumulator
            }, '')
            conjuntoCards.innerHTML = cardsPokemon
        })
}

fetchPokemon()
/* 
pokemon.name,
pokemon.id,
pokemon.types.map(typeInfo => typeInfo.type.name).join(" | "),
pokemon.abilities.map(abilInfo => abilInfo.ability.name).join(" | "),
pokemon.stats.map(a => a.base_stat).join(" | "))  */
/* pokemon.types.forEach(a => console.log(pokemon.name, a.type.name)) */