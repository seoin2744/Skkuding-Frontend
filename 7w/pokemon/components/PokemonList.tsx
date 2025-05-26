"use client";

import { useEffect, useState } from "react";
import { RestPokemon } from "./types";
import styles from "../styles/PokemonList.module.css";
import Link from "next/link";
import Image from "next/image";

export function PokemonList() {
  const [pokemons, setPokemons] = useState<RestPokemon[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPokemonList = async () => {
      try {
        const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=10");
        const data = await res.json();
        const results = data.results;

        const detailedData = await Promise.all(
          results.map(async (pokemon: { name: string; url: string }) => {
            const detailRes = await fetch(pokemon.url);
            const detail = await detailRes.json();

            return {
              id: detail.id,
              name: detail.name,
              height: detail.height,
              weight: detail.weight,
              types: detail.types.map(
                (t: { type: { name: string } }) => t.type.name
              ),
            };
          })
        );

        setPokemons(detailedData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching Pokémon list", error);
      }
    };

    fetchPokemonList();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <main>
      <div className={styles.cardList}>
        {pokemons.map((pokemon) => (
          <Link
            href={`/${pokemon.id}`}
            key={pokemon.id}
            className={styles.card}
          >
            <Image
              className={styles.cardImage}
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`}
              alt={pokemon.name}
              width={200}
              height={200}
            />
            <div className={styles.infoWrapper}>
              <h2 className={styles.infoName}>{pokemon.name}</h2>
              <p>height: {pokemon.height} dm</p>
              <p>weight: {pokemon.weight} hg</p>
              <p>types: {pokemon.types.join(", ")}</p>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
