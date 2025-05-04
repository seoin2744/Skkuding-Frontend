const main = document.querySelector("main");
const pokemonData = window.localStorage.getItem('pokemon');

if (pokemonData) {
    const pokemon = JSON.parse(pokemonData);

    const imgWrapper = document.createElement('div');
    imgWrapper.className = 'img-wrapper';
    const img = document.createElement('img');
    img.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`;
    img.alt = pokemon.name;

    imgWrapper.appendChild(img);

    const nameH2 = document.createElement('h2');
    nameH2.textContent = pokemon.name;
    const table = document.createElement('table');

    for (const key in pokemon) {
        if (key === 'id') continue; // id 표시 x

        const tr = document.createElement('tr');
        const tdKey = document.createElement('td');
        tdKey.textContent = key;

        const tdValue = document.createElement('td');

        // 단위 있는 애들만 표시
        if (key === 'height') {
            tdValue.textContent = `${pokemon[key]} dm`;
        } else if (key === 'weight') {
            tdValue.textContent = `${pokemon[key]} hg`;
        } else if (Array.isArray(pokemon[key])) {
            tdValue.textContent = pokemon[key].join(', ');
        } else {
            tdValue.textContent = pokemon[key];
        }
 
        tr.appendChild(tdKey);
        tr.appendChild(tdValue);
        table.appendChild(tr);
    }

    main.appendChild(imgWrapper);
    main.appendChild(nameH2);
    main.appendChild(table);

} else  {
    pokemonDetail.textContent = 'Not Found!';
}