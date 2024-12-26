import type CaughtPokémons from '@/types/CaughtPokémons';
import { CaughtPokémonsSchema } from '@/types/CaughtPokémons';
import getRandomArrayIndex from '@/utils/getRandomArrayIndex';
import { queryOptions, useQuery } from '@tanstack/react-query';
import axios from 'axios';
import ms from 'milliseconds';

const api = axios.create({
  baseURL: 'https://pokeapi.co/api/v2/',
  timeout: ms.seconds(10),
  headers: {
    'Content-Type': 'application/json',
  },
});

const fetchAllPokémon = async (): Promise<CaughtPokémons> => {
  const fetchRecursive = async (url: string, aggregatedResults: CaughtPokémons['results'] = []): Promise<CaughtPokémons> => {
    const { data } = await api.get<CaughtPokémons>(url);

    // Combine the current page results with aggregated results
    const updatedResults = aggregatedResults.concat(data.results);

    if (data.next) {
      // Continue fetching the next page recursively
      return fetchRecursive(data.next, updatedResults);
    }

    const combinedData = { ...data, results: updatedResults, next: null, previous: null };
    const parsedData = CaughtPokémonsSchema.parse(combinedData);

    return parsedData;
  };

  const initialUrl = 'pokemon?offset=0&limit=200'; // Base endpoint, relative to the Axios instance's baseURL
  return fetchRecursive(initialUrl);
};

const randomPokémonOptions = queryOptions({
  queryKey: ['randomPokémon'],
  queryFn: () => fetchAllPokémon(),
  staleTime: Infinity,
  select: (randomPokémon) => getRandomArrayIndex(randomPokémon.results.map((pokémon) => pokémon.name)),
});

const useRandomPokémon = () => {
  return useQuery({
    ...randomPokémonOptions,
  });
};

export { randomPokémonOptions };

export default useRandomPokémon;
