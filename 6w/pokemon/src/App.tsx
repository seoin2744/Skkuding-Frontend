import { PokemonList } from "./components/PokemonList";
import { PokemonDetail } from "./components/PokemonDetail";
// import pokemons from "./data/data";
import "./styles/App.css";
import "./styles/reset.css";
import "./styles/style.css";
import usePokemonStore from "./store/usePokemonStore";

function App() {
  const selectedPokemon = usePokemonStore((state) => state.selectedPokemon);
  const setSelectedPokemon = usePokemonStore(
    (state) => state.setSelectedPokemon
  );

  return (
    <>
      <nav>
        <h1 onClick={() => setSelectedPokemon(-1)}>Pokemon List</h1>
      </nav>
      {selectedPokemon === -1 ? (
        <PokemonList onSelect={setSelectedPokemon} />
      ) : (
        <PokemonDetail
          id={selectedPokemon + 1}
          onBack={() => setSelectedPokemon(-1)}
        />
      )}
    </>
  );
}

export default App;
