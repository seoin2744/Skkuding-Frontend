import pokemons from '../assets/pokemon.js'; 

const cardList = document.getElementById('card-list');

pokemons.map( (pokemon,index) => {
    const card = document.createElement('div');
    card.className='card';

    const img = document.createElement('img');
    img.src=`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${index+1}.png`;
    img.alt=pokemon.name;

    const info = document.createElement('div');
    info.className = 'info-wrapper';

    const name = document.createElement('h2');
    name.textContent = pokemon.name;


    const height = document.createElement('p'); 
    height.textContent = `height: ${pokemon.height} dm`;


    const weight = document.createElement('p');
    weight.textContent = `weight: ${pokemon.weight} hg`;

    const types = document.createElement('p');
    types.textContent = `types: ${pokemon.types.join(', ')}`;

    info.appendChild(name);
    info.appendChild(height);
    info.appendChild(weight);
    info.appendChild(types);

    card.appendChild(img);
    card.appendChild(info);

    // detail 페이지에 id 값을 넘기기 위해 추가함.
    const pokemonInfo = {
        ...pokemon,
        id: index + 1,
    };

    card.addEventListener("click", () => {
        window.localStorage.setItem('pokemon',JSON.stringify(pokemonInfo));
        window.location.href = 'detail.html';
    });

    cardList.appendChild(card);

})