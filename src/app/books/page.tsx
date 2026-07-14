import BookList from '@/components/BookList';
import PageContainer from '@/components/layouts/PageContainer';
import { Suspense } from 'react';
import LoadingIndicator from '@/components/LoadingIndicator';

export default function BooksPage() {
  return (
    <PageContainer>
      <h2>Books</h2>
      <Suspense fallback={<LoadingIndicator />}>
        <BookList />
      </Suspense>
    </PageContainer>
  );
}
