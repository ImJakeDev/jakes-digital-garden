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
    <div style={{ maxWidth: 'min-content' }}>
      <h2>{book.work.title}</h2>
      <p>Author: {book.work.author_names[0]}</p>
      <div className={CoverImageStyles}>
        <Image src={`https://covers.openlibrary.org/b/${key}/${book.work.cover_id}-${size}.jpg`} alt={book.work.title} fill={true} />
      </div>
    </div>
  );
}

const CoverImageStyles = css`
  position: relative;
  aspect-ratio: 2/3;
  min-width: 20ch;
  max-width: 30ch;
  min-height: 20ch;
  max-height: 30ch;
`;
