import type Open5eRacesResponse from '@/types/Open5eRacesResponse';
import { Open5eRacesResponseSchema } from '@/types/Open5eRacesResponse';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import ms from 'milliseconds';

const api = axios.create({
  baseURL: 'https://api.open5e.com/v2/',
  timeout: ms.seconds(10),
  headers: {
    'Content-Type': 'application/json',
  },
});

const fetchSpecies = async (): Promise<Open5eRacesResponse> => {
  // Todo: Make dynamic selection based on how user provides params.
  const fetchRecursive = async (url: string, aggregatedResults: Open5eRacesResponse['results'] = []): Promise<Open5eRacesResponse> => {
    const { data } = await api.get<Open5eRacesResponse>(url);

    // Combine the current page results with aggregated results
    const updatedResults = aggregatedResults.concat(data.results);

    if (data.next) {
      // Continue fetching the next page recursively
      return fetchRecursive(data.next, updatedResults);
    }

    const combinedData = { ...data, results: updatedResults, next: null, previous: null };
    const parsedData = Open5eRacesResponseSchema.parse(combinedData);

    return parsedData;
  };

  const initialUrl = 'races/'; // Base endpoint, relative to the Axios instance's baseURL
  return fetchRecursive(initialUrl);
};

const useOpen5eSpecies = () => {
  return useQuery({
    queryKey: ['open-5e-species'],
    queryFn: () => fetchSpecies(),
    staleTime: Infinity,
  });
};

export default useOpen5eSpecies;
