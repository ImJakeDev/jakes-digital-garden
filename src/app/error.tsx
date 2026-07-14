'use client';

import { useEffect } from 'react';

interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main>
      <h1>Something went wrong</h1>
      <p>We couldn&apos;t load this part of the garden.</p>
      <button type="button" onClick={reset}>
        Try again
      </button>
    </main>
  );
}
