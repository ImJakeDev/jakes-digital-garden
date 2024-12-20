import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const fetchPokémon = async (pokémon: string) => {
  const response = axios.get(`https://pokeapi.co/api/v2/pokemon/${pokémon}/`);
  return (await response).data;
};

const usePokémon = (pokémon: string) => {
  return useQuery({
    queryKey: ['pokémon', pokémon],
    queryFn: () => fetchPokémon(pokémon),
    staleTime: Infinity,
  });
};

export default usePokémon;
