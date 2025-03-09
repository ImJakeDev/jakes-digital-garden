'use client';
import toTitleCase from '@/utils/toTitleCase';
import { css } from '@linaria/core';
import Image from 'next/image';

type BookProps = {
  title: string;
  author: string;
  coverId: number;
};

export default function Book({ title, author, coverId }: BookProps) {
  const key = 'ID';
  const size = 'L';

  return (
    <div className={BookWorkStyles}>
      <h3>{toTitleCase(title)}</h3>
      <p>Author: {author}</p>
      <Image src={`https://covers.openlibrary.org/b/${key}/${coverId}-${size}.jpg`} alt={title} width={200} height={300} />
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
