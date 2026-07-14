import AllCaughtPokémon, { AllCaughtPokémonSchema } from '@/types/AllCaughtPokémon';
import { queryOptions, useQuery } from '@tanstack/react-query';

const fetchPokémonPage = async (url: string): Promise<AllCaughtPokémon> => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`PokéAPI request failed: ${String(response.status)}`);
  }

  return AllCaughtPokémonSchema.parse(await response.json());
};

export const fetchRandomPokémon = async (): Promise<string> => {
  const { count } = await fetchPokémonPage('https://pokeapi.co/api/v2/pokemon?limit=1');
  const offset = Math.floor(Math.random() * count);
  const { results } = await fetchPokémonPage(`https://pokeapi.co/api/v2/pokemon?offset=${String(offset)}&limit=1`);
  const pokémon = results.at(0);

  if (!pokémon) {
    throw new Error('PokéAPI returned no Pokémon for a valid offset.');
  }

  return pokémon.name;
};

const randomPokémonOptions = queryOptions({
  queryKey: ['randomPokémon'],
  queryFn: fetchRandomPokémon,
  staleTime: Infinity,
});

const useRandomPokémon = () => {
  return useQuery({
    ...randomPokémonOptions,
  });
};

export { randomPokémonOptions };

export default useRandomPokémon;
