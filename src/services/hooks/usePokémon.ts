import { useQuery, useSuspenseQuery } from '@tanstack/react-query';
import axios from 'axios';
import { pokémonsOptions } from './usePokémons';
import getRandomArrayIndex from '@/utils/getRandomArrayIndex';

const fetchPokémon = async (pokémon: string) => {
  // https://pokeapi.co/
  const response = axios.get(`https://pokeapi.co/api/v2/pokemon/${pokémon}/`);
  return (await response).data;
};

const usePokémon = (pokémon?: string) => {
  const { data: pokémons } = useSuspenseQuery(pokémonsOptions);

  const randomPokémon = getRandomArrayIndex(pokémons.results);

  return useQuery({
    queryKey: ['pokémon', pokémon, randomPokémon.name],
    queryFn: () => fetchPokémon(!!pokémon ? pokémon : randomPokémon.name),
    staleTime: Infinity,
  });
};

export default usePokémon;
