import { create } from "zustand";

interface PokemonStore {
  selectedPokemon: number;
  setSelectedPokemon: (index: number) => void;
}

const usePokemonStore = create<PokemonStore>((set) => ({
  selectedPokemon: -1,
  setSelectedPokemon: (index) => set({ selectedPokemon: index }),
}));

export default usePokemonStore;
