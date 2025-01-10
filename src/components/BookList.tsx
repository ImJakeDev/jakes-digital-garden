'use client';
import { openLibraryOptions } from '@/services/hooks/useOpenLibrary';
import Book from './Book';
import { useSuspenseQuery } from '@tanstack/react-query';
import { css } from '@linaria/core';
import Link from 'next/link';
import { createUrlTitle } from '@/utils/createUrlTitle';

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
              const urlTitle = createUrlTitle(book.work.title);
              return (
                <li key={index}>
                  <Link href={`/books/${urlTitle}`}>
                    <Book work={book.work} />
                  </Link>
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
  align-items: flex-start;
  justify-content: flex-start;
  flex-flow: row wrap;
  gap: var(--space-m-l);
`;
