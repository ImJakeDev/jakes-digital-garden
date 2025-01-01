'use client';
import { openLibraryOptions } from '@/services/hooks/useOpenLibrary';
import Book from './Book';
import { useSuspenseQuery } from '@tanstack/react-query';
import { css } from '@linaria/core';

export default function BookList() {
  const { data, isLoading, isError } = useSuspenseQuery(openLibraryOptions);

  return (
    <>
      {isLoading ? (
        <p>Loading...</p>
      ) : isError ? (
        <p>Error</p>
      ) : (
        !!data && (
          <ul className={BooksStyles}>
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
    </>
  );
}

const BooksStyles = css`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: var(--space-m-l);
`;
