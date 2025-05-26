import { useEffect, useState } from "react";
import axios from "axios";
import { PokemonItem } from "./PokemonItem";
import { RestPokemon } from "../types";
import styles from "../styles/PokemonList.module.css";

interface PokemonListProps {
  onSelect: (index: number) => void;
}

export function PokemonList({ onSelect }: PokemonListProps) {
  const [pokemons, setPokemons] = useState<RestPokemon[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPokemonList = async () => {
      try {
        const res = await axios.get(
          "https://pokeapi.co/api/v2/pokemon?limit=10"
        );
        const results = res.data.results;

        // 각각의 포켓몬 상세 정보를 요청
        const detailedData = await Promise.all(
          results.map(async (pokemon: any) => {
            const detailRes = await axios.get(pokemon.url);
            return {
              name: detailRes.data.name,
              height: detailRes.data.height,
              weight: detailRes.data.weight,
              types: detailRes.data.types.map((t: any) => t.type.name),
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
}
