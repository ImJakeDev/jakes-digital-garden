import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import ms from 'milliseconds';
import { randomPokémonOptions } from '@/services/hooks/useRandomPokémon';
import type { Pokemon } from 'pokenode-ts';

const api = axios.create({
  baseURL: 'https://pokeapi.co/api/v2/',
  timeout: ms.seconds(10),
});

const fetchPokémon = async (pokémon: string) => {
  // https://pokeapi.co/
  const response = await api.get(`pokemon/${pokémon}/`);

  return response.data as Pokemon;
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
