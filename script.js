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
                let tiposClass = types.map(typeInfo => typeInfo.type.name);
                let imagem = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`; ''
                let habilidades = abilities.map(abilInfo => abilInfo.ability.name).join(" | ");
                let estatisticas = stats.map(a => a.base_stat).join(" | ");
                let estatisticasSep = stats.map(a => a.base_stat);
                accumulator += 
                `
                <div class="card ${tiposClass[0]}">
                    <img src=${imagem}>
                    <p>${id}. ${name}</p>
                    <p>${tipos}</p>
                    <p>${habilidades}</p>
                    <ul>
                        <li>HP.:${estatisticasSep[0]}</li>
                        <li>ATK:${estatisticasSep[1]}</li>
                        <li>DEF:${estatisticasSep[2]}</li>
                        <li>SP. ATK.:${estatisticasSep[3]}</li>
                        <li>SP. DEF${estatisticasSep[4]}</li>
                        <li>SPEED:${estatisticasSep[5]}</li>
                    </ul>
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