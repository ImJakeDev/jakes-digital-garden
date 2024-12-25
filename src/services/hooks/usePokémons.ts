import type CaughtPokémons from '@/types/CaughtPokémons';
import { queryOptions, useQuery } from '@tanstack/react-query';
import axios from 'axios';

const fetchPokémons = async (): Promise<CaughtPokémons> => {
  // https://pokeapi.co/
  const response = axios.get(`https://pokeapi.co/api/v2/pokemon/`);
  return (await response).data;
};

const usePokémons = () => {
  // Todo: Add a select method that cleans up the data and gives it a type A.K.A. "a data massage" 💆
  return useQuery({
    queryKey: ['pokémons'],
    queryFn: () => fetchPokémons(),
    staleTime: Infinity,
  });
};

const pokémonsOptions = queryOptions({
  queryKey: ['pokémons'],
  queryFn: () => fetchPokémons(),
});

export { pokémonsOptions };

export default usePokémons;
