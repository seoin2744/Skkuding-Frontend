"use client";

import Image from "next/image";
import styles from "../styles/PokemonDetail.module.css";
import { pokemons } from "./data";

interface Props {
  id: number;
}

export function PokemonDetail({ id }: Props) {
  const pokemon = pokemons.find((p) => p.id === id);

  if (!pokemon) return <div>존재하지 않는 포켓몬입니다.</div>;

  return (
    <main>
      <div className={styles.imgWrapper}>
        <Image
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`}
          alt={pokemon.name}
          width={300}
          height={300}
        />
      </div>

      <h2 className={styles.heading}>{pokemon.name}</h2>

      <table className={styles.table}>
        <tbody>
          <tr className={styles.row}>
            <td className={styles.cell}>Height</td>
            <td className={styles.cell}>{pokemon.height} dm</td>
          </tr>
          <tr className={styles.row}>
            <td className={styles.cell}>Weight</td>
            <td className={styles.cell}>{pokemon.weight} hg</td>
          </tr>
          <tr className={styles.row}>
            <td className={styles.cell}>Types</td>
            <td className={styles.cell}>{pokemon.types.join(", ")}</td>
          </tr>
          <tr className={styles.row}>
            <td className={styles.cell}>Base Experience</td>
            <td className={styles.cell}>{pokemon.base_experience}</td>
          </tr>
          <tr className={styles.row}>
            <td className={styles.cell}>Abilities</td>
            <td className={styles.cell}>{pokemon.abilities.join(", ")}</td>
          </tr>
          <tr className={styles.row}>
            <td className={styles.cell}>HP</td>
            <td className={styles.cell}>{pokemon.hp}</td>
          </tr>
          <tr className={styles.row}>
            <td className={styles.cell}>Attack</td>
            <td className={styles.cell}>{pokemon.attack}</td>
          </tr>
          <tr className={styles.row}>
            <td className={styles.cell}>Defense</td>
            <td className={styles.cell}>{pokemon.defense}</td>
          </tr>
          <tr className={styles.row}>
            <td className={styles.cell}>Special Attack</td>
            <td className={styles.cell}>{pokemon.special_attack}</td>
          </tr>
          <tr className={styles.row}>
            <td className={styles.cell}>Special Defense</td>
            <td className={styles.cell}>{pokemon.special_defense}</td>
          </tr>
          <tr className={styles.row}>
            <td className={styles.cell}>Speed</td>
            <td className={styles.cell}>{pokemon.speed}</td>
          </tr>
        </tbody>
      </table>
    </main>
  );
}
