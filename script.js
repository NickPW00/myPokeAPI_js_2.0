const pokemonPromises = [];
var body = document.querySelector("body");
var conjuntoCards = document.querySelector("#conjuntoCards");

const fetchPokemon = () => {
    const getPokemonUrl = id =>`https://pokeapi.co/api/v2/pokemon/${id}`
    
    for(var i = 1; i <= 251; i++){
        pokemonPromises.push(fetch(getPokemonUrl(i)).then(response => response.json()))
    };

    Promise.all(pokemonPromises)
        .then(pokemons => {
            console.log(pokemons[0], `https://pokeapi.co/api/v2/pokemon-species/0/`)
            var cardsPokemon = pokemons.reduce((accumulator, {name, id, types, abilities, stats}) => {
                var tipos = types.map(typeInfo => typeInfo.type.name).join(" | ");
                var tiposClass = types.map(typeInfo => typeInfo.type.name);
                var imagem = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
                var imagemTipo = `https://pokeapi.co/api/v2/type/12/`;
                var habilidades = abilities.map(abilInfo => abilInfo.ability.name).join(" | ");
                var estatisticas = stats.map(a => a.base_stat).join(" | ");
                var estatisticasSep = stats.map(a => a.base_stat);
                accumulator += 
                `
                <div class="card ${tiposClass[0]}">
                    <div class="fundo">
                        <img src=${imagem}>
                    </div>
                    <div>
                        <p>${id}. ${name}</p>
                        <div class='typeContainer'>
                        <img src='poketypesV2/${tiposClass[0]}.png' alt='tipo primário: ${tiposClass[0]}'>
                        <img src='poketypesV2/${tiposClass[1]}.png' alt='tipo secundário: ${tiposClass[1]}' onerror="this.style.display='none'">
                        </div>
                    </div>
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