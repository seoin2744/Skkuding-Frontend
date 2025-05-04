import React from 'react';
import PokemonItem from './PokemonItem';
import { Pokemon } from '../types';
import styles from '../styles/PokemonList.module.css';

interface PokemonListProps {
  pokemons: Pokemon[];
  onSelect: (index: number) => void;
}

const PokemonList: React.FC<PokemonListProps> = ({ pokemons, onSelect }) => {
  return (
    <main>
      <div className={styles.cardList}>
        {pokemons.map((pokemon, index) => (
          <PokemonItem
            key={index}
            pokemon={pokemon}
            index={index}
            onSelect={onSelect}
          />
        ))}
      </div>
    </main>
  );
};

export default PokemonList;
