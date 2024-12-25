import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const fetchPokémon = async (pokémon: string) => {
  // https://pokeapi.co/
  const response = axios.get(`https://pokeapi.co/api/v2/pokemon/${pokémon}/`);
  return (await response).data;
};

const usePokémon = (pokémon: string) => {
  // Todo: Add a select method that cleans up the data and gives it a type A.K.A. "a data massage" 💆
  return useQuery({
    queryKey: ['pokémon', pokémon],
    queryFn: () => fetchPokémon(pokémon),
    staleTime: Infinity,
  });
};

export default usePokémon;
