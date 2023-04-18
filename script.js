const qtdPokemons = 251
const pokemonPromises = [];
const pokemonSpeciePromises = [];

let body = document.querySelector("body");
let conjuntoCards = document.querySelector("#conjuntoCards");

const fetchPokemon = () => {
    const getPokemonUrl = id =>`https://pokeapi.co/api/v2/pokemon/${id}`
    const getPokemonSpecieUrl = id =>`https://pokeapi.co/api/v2/pokemon-species/${id}`
    for(let i = 1; i <= qtdPokemons; i++){
        pokemonPromises.push(fetch(getPokemonUrl(i)).then(response => response.json()))
        pokemonSpeciePromises.push(fetch(getPokemonSpecieUrl(i)).then(response => response.json()))
    };
    
    Promise.all([...pokemonPromises, ...pokemonSpeciePromises])
        .then(pokemons => {
            let pokemonArray = [];
            for(let i = 0; i < qtdPokemons; i++){
                pokemonArray.push(Object.assign({} ,pokemons[i], pokemons[qtdPokemons + i]));
            }
            console.log(pokemonArray[0])
            let cardsPokemon = pokemonArray.reduce((accumulator, {name, id, types, abilities, stats, height, weight, flavor_text_entries}) => {
                let tipos = types.map(typeInfo => typeInfo.type.name).join(" | ");
                let tiposClass = types.map(typeInfo => typeInfo.type.name);
                let imagem = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
                let habilidades = abilities.map(abilInfo => abilInfo.ability.name).join(" | ");
                let estatisticasSep = stats.map(a => a.base_stat);
                accumulator += 
                `
                    <div>
                        <div class="card ${tiposClass[0]}">
                            <div class="fundo">
                                <img src=${imagem}>
                            </div>
                            <div>
                                <p>${id}. ${name[0].toUpperCase() + name.substring(1)}</p>
                                <p>${tipos}</p>
                                <p> 
                                    height: ${height/10} m<br>
                                    weight: ${weight/10} kg
                                </p>
                            </div>
                            <div>
                                <p>Habilidades:</p>
                                <p>${habilidades}</p>
                            </div>
                            <div>
                            <p>Estatísticas:</p>
                                <ul>
                                    <li>HP.:${estatisticasSep[0]}</li>
                                    <li>ATK:${estatisticasSep[1]}</li>
                                    <li>DEF:${estatisticasSep[2]}</li>
                                    <li>SP. ATK:${estatisticasSep[3]}</li>
                                    <li>SP. DEF:${estatisticasSep[4]}</li>
                                    <li>SPEED:${estatisticasSep[5]}</li>
                                </ul>
                            </div>
                            <div>
                                <p>${flavor_text_entries[9].flavor_text}</p>
                            </div>
                        </div>
                    </div>
                `
                return accumulator
            }, '')
            conjuntoCards.innerHTML = cardsPokemon
        }
    )
}

fetchPokemon()
/* 
pokemon.name,
pokemon.id,
pokemon.types.map(typeInfo => typeInfo.type.name).join(" | "),
pokemon.abilities.map(abilInfo => abilInfo.ability.name).join(" | "),
pokemon.stats.map(a => a.base_stat).join(" | "))  */
/* pokemon.types.forEach(a => console.log(pokemon.name, a.type.name)) */
/* 
pokemons => {
    console.log(pokemons[0], `https://pokeapi.co/api/v2/pokemon-species/0/`)
    let cardsPokemon = pokemons.reduce((accumulator, {name, id, types, abilities, stats, height, weight}) => {
        let tipos = types.map(typeInfo => typeInfo.type.name).join(" | ");
        let tiposClass = types.map(typeInfo => typeInfo.type.name);
        let imagem = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
        let habilidades = abilities.map(abilInfo => abilInfo.ability.name).join(" | ");
        let estatisticasSep = stats.map(a => a.base_stat);
        accumulator += 
        `
            <div class="card ${tiposClass[0]}">
                <div class="fundo">
                    <img src=${imagem}>
                </div>
                <div>
                    <p>${id}. ${name[0].toUpperCase() + name.substring(1)}</p>
                    <p>${tipos}</p>
                    <p> 
                        height: ${height/10} m<br>
                        weight: ${weight/10} kg
                    </p>
                </div>
                <div>
                    <p>Habilidades:</p>
                    <p>${habilidades}</p>
                </div>
                <div>
                <p>Estatísticas:</p>
                    <ul>
                        <li>HP.:${estatisticasSep[0]}</li>
                        <li>ATK:${estatisticasSep[1]}</li>
                        <li>DEF:${estatisticasSep[2]}</li>
                        <li>SP. ATK:${estatisticasSep[3]}</li>
                        <li>SP. DEF:${estatisticasSep[4]}</li>
                        <li>SPEED:${estatisticasSep[5]}</li>
                    </ul>
                </div>
                
            </div>
        `
        return accumulator
    }, '')
    conjuntoCards.innerHTML = cardsPokemon
 */