'use client';
import { openLibraryOptions } from '@/services/openLibrary';
import Book from './Book';
import { useQuery } from '@tanstack/react-query';
import { css } from '@linaria/core';
import Link from 'next/link';
import { createUrlTitle } from '@/utils/createUrlTitle';

export default function BookList() {
  const { data, isError, isLoading } = useQuery({
    ...openLibraryOptions,
    enabled: typeof window !== 'undefined',
  });

  if (isError) {
    return <div>Error loading books.</div>;
  }

  if (isLoading || !data) {
    return <div>Loading books…</div>;
  }

  return (
    <ul className={BooksStyles}>
      {data.reading_log_entries?.map((book) => {
        if (!book.work) {
          return null;
        }
        const urlTitle = createUrlTitle(book.work.title);
        return (
          <li key={book.work.key}>
            <Link href={`/books/${urlTitle}`}>
              <Book title={book.work.title} author={book.work.author_names[0] ?? 'Unknown'} coverId={book.work.cover_id} />
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

const BooksStyles = css`
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  flex-flow: row wrap;
  gap: var(--space-m-l);
  list-style: none;
  padding: 0;

  li {
    padding: 0;
  }
`;
