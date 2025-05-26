import { useEffect, useState } from "react";
import styles from "../styles/PokemonDetail.module.css";
import { FullPokemon } from "../types";

interface Props {
  id: number;
  onBack: () => void;
}

export function PokemonDetail({ id, onBack }: Props) {
  const [pokemon, setPokemon] = useState<FullPokemon | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPokemonDetail = async () => {
      try {
        const query = `
        query GetPokemon($id: Int!) {
          pokemon_v2_pokemon_by_pk(id: $id) {
            id
            name
            height
            weight
            base_experience
            pokemon_v2_pokemontypes {
              pokemon_v2_type {
                name
              }
            }
            pokemon_v2_pokemonabilities {
              pokemon_v2_ability {
                name
              }
            }
            pokemon_v2_pokemonstats {
              base_stat
              pokemon_v2_stat {
                name
              }
            }
          }
        }
      `;

        const response = await fetch("https://beta.pokeapi.co/graphql/v1beta", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            query,
            variables: { id },
          }),
        });

        const json = await response.json();
        const data = json.data.pokemon_v2_pokemon_by_pk;

        const statsObj: FullPokemon["stats"] = {
          hp: 0,
          attack: 0,
          defense: 0,
          special_attack: 0,
          special_defense: 0,
          speed: 0,
        };

        for (const stat of data.pokemon_v2_pokemonstats) {
          const name = stat.pokemon_v2_stat.name.replace(
            "-",
            "_"
          ) as keyof FullPokemon["stats"];
          statsObj[name] = stat.base_stat;
        }

        const result: FullPokemon = {
          id: data.id,
          name: data.name,
          height: data.height,
          weight: data.weight,
          base_experience: data.base_experience,
          types: data.pokemon_v2_pokemontypes.map(
            (t: any) => t.pokemon_v2_type.name
          ),
          abilities: data.pokemon_v2_pokemonabilities.map(
            (a: any) => a.pokemon_v2_ability.name
          ),
          stats: statsObj,
        };

        setPokemon(result);
        setLoading(false);
      } catch (error) {
        console.error("GraphQL fetch error:", error);
      }
    };

    fetchPokemonDetail();
  }, [id]);

  if (loading || !pokemon) return <div>Loading...</div>;

  return (
    <main>
      <div className={styles.imgWrapper}>
        <img
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`}
          alt={pokemon.name}
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
            <td className={styles.cell}>Hp</td>
            <td className={styles.cell}>{pokemon.stats.hp}</td>
          </tr>
          <tr className={styles.row}>
            <td className={styles.cell}>Attack</td>
            <td className={styles.cell}>{pokemon.stats.attack}</td>
          </tr>
          <tr className={styles.row}>
            <td className={styles.cell}>Defense</td>
            <td className={styles.cell}>{pokemon.stats.defense}</td>
          </tr>
          <tr className={styles.row}>
            <td className={styles.cell}>Special-Attack</td>
            <td className={styles.cell}>{pokemon.stats.special_attack}</td>
          </tr>
          <tr className={styles.row}>
            <td className={styles.cell}>Special-Defense</td>
            <td className={styles.cell}>{pokemon.stats.special_defense}</td>
          </tr>
          <tr className={styles.row}>
            <td className={styles.cell}>Speed</td>
            <td className={styles.cell}>{pokemon.stats.speed}</td>
          </tr>
        </tbody>
      </table>
    </main>
  );
}
