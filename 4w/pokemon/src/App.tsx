import { useState } from 'react';
import PokemonList from './components/PokemonList';
import PokemonDetail from './components/PokemonDetail';
import pokemons from './data/data';
import './styles/App.css';
import './styles/reset.css';
import './styles/style.css';

function App() {
  const [selectedPokemon, setSelectedPokemon] = useState(-1);

  return (
    <>
      <nav>
        <h1 onClick={() => setSelectedPokemon(-1)}>
            Pokemon List
        </h1>
      </nav>
        {selectedPokemon === -1 ? (
            <PokemonList pokemons={pokemons} onSelect={setSelectedPokemon} />
          ) : (
            <PokemonDetail pokemon={{ ...pokemons[selectedPokemon], id: selectedPokemon + 1 }} onBack={() => setSelectedPokemon(-1)} />
        )}
    </>
  );
}

export default App;
