import { getQueryClient } from '@/app/get-query-client';
import PageContainer from '@/components/layouts/PageContainer';
import { openLibraryOptions } from '@/services/hooks/useOpenLibrary';
import OpenLibraryAlreadyReadResponse from '@/types/OpenLibraryAlreadyReadResponse';
import { createUrlTitle } from '@/utils/createUrlTitle';
import toTitleCase from '@/utils/toTitleCase';
import { css } from '@linaria/core';
import Image from 'next/image';

interface PageProps {
  params: {
    book: string;
  };
}

// Reverse the URL formatting to match against the original title
function matchesUrlTitle(originalTitle: string, urlTitle: string) {
  return createUrlTitle(originalTitle) === urlTitle;
}

// Generate static pages at build time
export async function generateStaticParams() {
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery(openLibraryOptions);

  const data = (await queryClient.getQueryData(openLibraryOptions.queryKey)) as OpenLibraryAlreadyReadResponse | undefined;

  if (!data?.reading_log_entries) {
    return [];
  }

  return data.reading_log_entries.map((book) => ({
    book: !!book.work ? createUrlTitle(book.work.title) : '',
  }));
}

export default async function BookPage({ params }: PageProps) {
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery(openLibraryOptions);

  const awaitedParams = await params;

  const data = (await queryClient.getQueryData(openLibraryOptions.queryKey)) as OpenLibraryAlreadyReadResponse;

  // Find the book by matching the URL-safe title
  const book = data.reading_log_entries?.find((entry) => (!!entry.work ? matchesUrlTitle(entry.work.title, awaitedParams.book) : false));

  if (!book || !book.work) {
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
        <Image src={`https://covers.openlibrary.org/b/${key}/${book.work.cover_id}-${size}.jpg`} alt={book.work.title} width={200} height={300} />
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
