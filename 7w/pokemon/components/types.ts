export interface RestPokemon {
  id: number;
  name: string;
  height: number;
  weight: number;
  types: string[];
}

export interface FullPokemon {
  id: number;
  name: string;
  height: number;
  weight: number;
  base_experience: number;
  types: string[];
  abilities: string[];
  stats: {
    hp: number;
    attack: number;
    defense: number;
    special_attack: number;
    special_defense: number;
    speed: number;
  };
}
