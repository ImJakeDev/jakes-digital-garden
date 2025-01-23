'use client';
import { css } from '@linaria/core';
import Image from 'next/image';

type BookProps = {
  work: {
    title: string;
    author_keys: string[];
    author_names: string[];
    cover_edition_key: string;
    cover_id: number;
    edition_key: string[];
    first_publish_year: number;
    key: string;
    lending_edition_s: string | null;
  };
};

export default function Book(book: BookProps) {
  const key = 'ID';
  const size = 'L';

  return (
    <div className={BookWorkStyles}>
      <h3>{book.work.title}</h3>
      <p>Author: {book.work.author_names[0]}</p>
      <Image src={`https://covers.openlibrary.org/b/${key}/${book.work.cover_id}-${size}.jpg`} alt={book.work.title} width={200} height={300} />
    </div>
  );
}

const BookWorkStyles = css`
  background-color: var(--surface-3);
  box-shadow: var(--shadow-1);
  border-radius: var(--radius-drawn-3);
  border: var(--border-size-2) solid var(--gray-6);
  padding: var(--size-fluid-2);
  max-width: var(--size-content-2);

  &:hover {
    box-shadow: var(--shadow-3);
    background-color: var(--surface-4);
  }
`;
