import { RestPokemon } from "../types";
import styles from "../styles/PokemonList.module.css";

interface PokemonItemProps {
  pokemon: RestPokemon;
  index: number;
  onSelect: (index: number) => void;
}

export function PokemonItem({ pokemon, index, onSelect }: PokemonItemProps) {
  return (
    <div className={styles.card} onClick={() => onSelect(index)}>
      <img
        className={styles.cardImage}
        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${
          index + 1
        }.png`}
        alt={pokemon.name}
      />
      <div className={styles.infoWrapper}>
        <h2 className={styles.infoName}>{pokemon.name}</h2>
        <p>height: {pokemon.height} dm</p>
        <p>weight: {pokemon.weight} hg</p>
        <p>types: {pokemon.types.join(", ")}</p>
      </div>
    </div>
  );
}
