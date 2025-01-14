import { useQuery, useSuspenseQuery } from '@tanstack/react-query';
import axios from 'axios';
import { randomPokémonOptions } from '@/services/hooks/useRandomPokémon';
import type { Pokemon } from 'pokenode-ts';

const fetchPokémon = async (pokémon: string) => {
  // https://pokeapi.co/
  const response = axios.get(`https://pokeapi.co/api/v2/pokemon/${pokémon}/`);
  const data = (await response).data as Pokemon;

  return data;
};

const usePokémon = (pokémon?: string) => {
  const { data: randomPokémon } = useSuspenseQuery(randomPokémonOptions);

  return useQuery({
    queryKey: ['pokémon', pokémon, randomPokémon],
    queryFn: () => fetchPokémon(!!pokémon ? pokémon : randomPokémon),
    staleTime: Infinity,
  });
};

export default usePokémon;
