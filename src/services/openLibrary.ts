import { OpenLibraryAlreadyReadResponseSchema } from '@/types/OpenLibraryAlreadyReadResponse';
import { queryOptions } from '@tanstack/react-query';
import ms from 'milliseconds';

const OPEN_LIBRARY_URL = 'https://openlibrary.org/people/jakeschaffer/books/already-read.json';
const OPEN_LIBRARY_REVALIDATE_SECONDS = ms.hours(1) / 1000;

export async function fetchOpenLibrary() {
  const response = await fetch(OPEN_LIBRARY_URL, {
    next: { revalidate: OPEN_LIBRARY_REVALIDATE_SECONDS },
  });
  if (!response.ok) {
    throw new Error(`Open Library request failed: ${String(response.status)}`);
  }

  return OpenLibraryAlreadyReadResponseSchema.parse(await response.json());
}

export const openLibraryOptions = queryOptions({
  queryKey: ['open-book'],
  queryFn: fetchOpenLibrary,
  staleTime: ms.hours(12),
});
