'use client';
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
  const size = 'M';

  return (
    <div>
      <h2>{book.work.title}</h2>
      <p>{book.work.author_names}</p>
      <Image src={`https://covers.openlibrary.org/b/${key}/${book.work.cover_id}-${size}.jpg`} alt={book.work.title} width={200} height={300} />
    </div>
  );
}
