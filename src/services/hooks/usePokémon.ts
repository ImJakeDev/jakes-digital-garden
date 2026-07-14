import { useQuery } from '@tanstack/react-query';
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
  const isClient = typeof window !== 'undefined';
  const { data: randomPokémon } = useQuery({
    ...randomPokémonOptions,
    enabled: isClient,
  });
  const name = pokémon ?? randomPokémon;

  return useQuery({
    queryKey: ['pokémon', name],
    queryFn: async () => {
      if (!name) {
        throw new Error('A Pokémon name is required.');
      }

      return fetchPokémon(name);
    },
    staleTime: Infinity,
    enabled: isClient && Boolean(name),
  });
};

export default usePokémon;
