import PageContainer from '@/components/layouts/PageContainer';
import { fetchOpenLibrary } from '@/services/openLibrary';
import { createUrlTitle } from '@/utils/createUrlTitle';
import toTitleCase from '@/utils/toTitleCase';
import { css } from '@linaria/core';
import Image from 'next/image';

interface PageProps {
  params: Promise<{
    book: string;
  }>;
}

// Reverse the URL formatting to match against the original title
function matchesUrlTitle(originalTitle: string, urlTitle: string) {
  return createUrlTitle(originalTitle) === urlTitle;
}

export default async function BookPage({ params }: PageProps) {
  const awaitedParams = await params;
  let data;

  try {
    data = await fetchOpenLibrary();
  } catch {
    return (
      <PageContainer>
        <h1>Library unavailable</h1>
        <p>Please try again shortly.</p>
      </PageContainer>
    );
  }

  // Find the book by matching the URL-safe title
  const book = data.reading_log_entries?.find((entry) => (entry.work ? matchesUrlTitle(entry.work.title, awaitedParams.book) : false));

  if (!book?.work) {
    return (
      <PageContainer>
        <h3>Book not found</h3>
      </PageContainer>
    );
  }

  const key = 'ID';
  const size = 'L';

  return (
    <PageContainer>
      <h1>{toTitleCase(book.work.title)}</h1>
      <span>
        <b>Author:</b> {book.work.author_names[0]}
      </span>
      <span>
        <b>Published:</b> {book.work.first_publish_year}
      </span>
      <span>
        <b>Cover ID:</b> {book.work.cover_id}
      </span>
      <div className={CoverImageStyles}>
        <Image src={`https://covers.openlibrary.org/b/${key}/${String(book.work.cover_id)}-${size}.jpg`} alt={book.work.title} width={200} height={300} />
      </div>
    </PageContainer>
  );
}

const CoverImageStyles = css`
  position: relative;
  aspect-ratio: 2/3;
  max-width: 20ch;
  min-width: 20ch;
`;
