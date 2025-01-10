import BookList from '@/components/BookList';
import PageContainer from '@/components/layouts/PageContainer';

export default function BooksPage() {
  return (
    <PageContainer>
      <h2>Books</h2>
      <BookList />
    </PageContainer>
  );
}
