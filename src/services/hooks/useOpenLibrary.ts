import { OpenLibraryAlreadyReadResponseSchema } from '@/types/OpenLibraryAlreadyReadResponse';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const fetchOpenLibrary = async () => {
  const response = axios.get(`https://openlibrary.org/people/jakeschaffer/books/already-read.json`);
  const data = (await response).data;

  return OpenLibraryAlreadyReadResponseSchema.parse(data);
};

const openLibraryOptions = {
  queryKey: ['open-book'],
  queryFn: () => fetchOpenLibrary(),
  staleTime: Infinity,
};

const useOpenLibrary = () => {
  return useQuery({
    ...openLibraryOptions,
  });
};

export { openLibraryOptions };

export default useOpenLibrary;
