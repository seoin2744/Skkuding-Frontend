import React from 'react';
import { Pokemon } from '../types';
import styles from '../styles/PokemonDetail.module.css';

interface Props {
  pokemon: Pokemon & { id: number };
  onBack: () => void;
}

const PokemonDetail: React.FC<Props> = ({ pokemon, onBack }) => {
  return (
    <main>
      <div className={styles.imgWrapper}>
        <img
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`}
          alt={pokemon.name}
        />
      </div>

      <h2 className={styles.heading}>{pokemon.name}</h2>

      <table className={styles.table}>
        {Object.entries(pokemon).map(([key, value]) => {
          if (key === 'id') return null; 

          const displayValue =
            key === 'height' ? `${value} dm` :
            key === 'weight' ? `${value} hg` :
            Array.isArray(value) ? value.join(', ') :
            value;

          return (
            <tr className={styles.row} key={key}>
              <td className={styles.cell}>{key}</td>
              <td className={styles.cell}>{displayValue}</td>
            </tr>
          );
        })}
      </table>
    </main>
  );
};

export default PokemonDetail;
