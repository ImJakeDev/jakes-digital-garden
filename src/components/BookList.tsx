'use client';
import { openLibraryOptions } from '@/services/hooks/useOpenLibrary';
import Book from './Book';
import { useSuspenseQuery } from '@tanstack/react-query';

export default function BookList() {
  const { data, isLoading, isError } = useSuspenseQuery(openLibraryOptions);

  return (
    <div>
      <h2>Book List:</h2>
      {isLoading ? (
        <p>Loading...</p>
      ) : isError ? (
        <p>Error</p>
      ) : (
        !!data && (
          <ul>
            {data.reading_log_entries.map((book, index) => {
              return (
                <li key={index}>
                  <Book work={book.work} />
                </li>
              );
            })}
          </ul>
        )
      )}
    </div>
  );
}
